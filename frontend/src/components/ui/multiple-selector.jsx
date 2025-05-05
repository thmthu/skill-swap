"use client";

import { Command as CommandPrimitive, useCommandState } from "cmdk";
import { X } from "lucide-react";
import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  useCallback,
  useMemo,
} from "react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

function transToGroupOption(options, groupBy) {
  if (options.length === 0) return {};

  if (!groupBy) {
    return { "": options };
  }

  const groupOption = {};
  options.forEach((option) => {
    const key = option[groupBy] || "";
    if (!groupOption[key]) {
      groupOption[key] = [];
    }
    groupOption[key].push(option);
  });
  return groupOption;
}

function removePickedOption(groupOption, picked) {
  const cloneOption = JSON.parse(JSON.stringify(groupOption));

  for (const [key, value] of Object.entries(cloneOption)) {
    cloneOption[key] = value.filter(
      (val) => !picked.find((p) => p.value === val.value)
    );
  }
  return cloneOption;
}

function isOptionsExist(groupOption, targetOption) {
  for (const [, value] of Object.entries(groupOption)) {
    if (
      value.some((option) => targetOption.find((p) => p.value === option.value))
    ) {
      return true;
    }
  }
  return false;
}

const CommandEmpty = forwardRef(({ className, ...props }, ref) => {
  const render = useCommandState((state) => state.filtered.count === 0);
  if (!render) return null;

  return (
    <div
      ref={ref}
      className={cn("py-6 text-center text-sm", className)}
      cmdk-empty=""
      role="presentation"
      {...props}
    />
  );
});
CommandEmpty.displayName = "CommandEmpty";

const MultipleSelector = forwardRef((props, ref) => {
  const {
    value,
    onChange,
    placeholder,
    defaultOptions = [],
    options: arrayOptions,
    delay,
    onSearch,
    onSearchSync,
    loadingIndicator,
    emptyIndicator,
    maxSelected = Number.MAX_SAFE_INTEGER,
    onMaxSelected,
    hidePlaceholderWhenSelected,
    disabled,
    groupBy,
    className,
    badgeClassName,
    selectFirstItem = true,
    creatable = false,
    triggerSearchOnFocus = false,
    commandProps,
    inputProps,
    hideClearAllButton = false,
  } = props;

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [onScrollbar, setOnScrollbar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(value || []);
  const [options, setOptions] = useState(
    transToGroupOption(defaultOptions, groupBy)
  );
  const [inputValue, setInputValue] = useState("");
  const debouncedSearchTerm = useDebounce(inputValue, delay || 500);

  useImperativeHandle(
    ref,
    () => ({
      selectedValue: [...selected],
      input: inputRef.current,
      focus: () => inputRef?.current?.focus(),
      reset: () => setSelected([]),
    }),
    [selected]
  );

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setOpen(false);
      inputRef.current.blur();
    }
  };

  const handleUnselect = useCallback(
    (option) => {
      const newOptions = selected.filter((s) => s.value !== option.value);
      setSelected(newOptions);
      onChange?.(newOptions);
    },
    [onChange, selected]
  );

  const handleKeyDown = useCallback(
    (e) => {
      const input = inputRef.current;
      if (input) {
        if (
          (e.key === "Delete" || e.key === "Backspace") &&
          input.value === "" &&
          selected.length > 0
        ) {
          const lastSelectOption = selected[selected.length - 1];
          if (!lastSelectOption.fixed) {
            handleUnselect(lastSelectOption);
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [handleUnselect, selected]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchend", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  useEffect(() => {
    if (!arrayOptions || onSearch) return;
    const newOption = transToGroupOption(arrayOptions, groupBy);
    if (JSON.stringify(newOption) !== JSON.stringify(options)) {
      setOptions(newOption);
    }
  }, [arrayOptions, groupBy, onSearch, options]);

  useEffect(() => {
    const exec = async () => {
      if (!onSearchSync || !open) return;
      if (triggerSearchOnFocus || debouncedSearchTerm) {
        const res = onSearchSync(debouncedSearchTerm);
        setOptions(transToGroupOption(res || [], groupBy));
      }
    };
    exec();
  }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus, onSearchSync]);

  useEffect(() => {
    const exec = async () => {
      if (!onSearch || !open) return;
      if (triggerSearchOnFocus || debouncedSearchTerm) {
        setIsLoading(true);
        const res = await onSearch(debouncedSearchTerm);
        setOptions(transToGroupOption(res || [], groupBy));
        setIsLoading(false);
      }
    };
    exec();
  }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus, onSearch]);

  const CreatableItem = () => {
    if (!creatable) return null;
    if (
      isOptionsExist(options, [{ value: inputValue, label: inputValue }]) ||
      selected.find((s) => s.value === inputValue)
    ) {
      return null;
    }

    if (!onSearch && inputValue.length > 0) {
      return (
        <CommandItem
          value={inputValue}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onSelect={(value) => {
            if (selected.length >= maxSelected) {
              onMaxSelected?.(selected.length);
              return;
            }
            setInputValue("");
            const newOptions = [...selected, { value, label: value }];
            setSelected(newOptions);
            onChange?.(newOptions);
          }}
        >
          {`Create "${inputValue}"`}
        </CommandItem>
      );
    }

    if (onSearch && debouncedSearchTerm.length > 0 && !isLoading) {
      return (
        <CommandItem
          value={inputValue}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onSelect={(value) => {
            if (selected.length >= maxSelected) {
              onMaxSelected?.(selected.length);
              return;
            }
            setInputValue("");
            const newOptions = [...selected, { value, label: value }];
            setSelected(newOptions);
            onChange?.(newOptions);
          }}
        >
          {`Create "${inputValue}"`}
        </CommandItem>
      );
    }

    return null;
  };

  const EmptyItem = useCallback(() => {
    if (!emptyIndicator) return null;
    if (onSearch && !creatable && Object.keys(options).length === 0) {
      return (
        <CommandItem value="-" disabled>
          {emptyIndicator}
        </CommandItem>
      );
    }
    return <CommandEmpty>{emptyIndicator}</CommandEmpty>;
  }, [creatable, emptyIndicator, onSearch, options]);

  const selectables = useMemo(
    () => removePickedOption(options, selected),
    [options, selected]
  );

  const commandFilter = useCallback(() => {
    if (commandProps?.filter) return commandProps.filter;
    if (creatable) {
      return (value, search) =>
        value.toLowerCase().includes(search.toLowerCase()) ? 1 : -1;
    }
    return undefined;
  }, [creatable, commandProps?.filter]);

  return (
    <Command
      ref={dropdownRef}
      {...commandProps}
      onKeyDown={(e) => {
        handleKeyDown(e);
        commandProps?.onKeyDown?.(e);
      }}
      className={cn(
        "h-auto overflow-visible bg-transparent",
        commandProps?.className
      )}
      shouldFilter={
        commandProps?.shouldFilter !== undefined
          ? commandProps.shouldFilter
          : !onSearch
      }
      filter={commandFilter()}
    >
      <div
        className={cn(
          "min-h-10 rounded-md  text-base ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 md:text-sm",
          {
            "cursor-text": !disabled && selected.length !== 0,
          },
          className
        )}
        onClick={() => {
          if (disabled) return;
          inputRef?.current?.focus();
        }}
      >
        <div className="flex items-center flex-nowrap gap-2 px-3 py-2 min-h-[48px] rounded-md  border border-input dark:border-white/20 bg-background dark:bg-gray-800/50 overflow-hidden">
          {selected.map((option) => (
            <Badge
              key={option.value}
              className={cn(
                "dark:bg-gray-800/70 dark:text-white/80 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1 border-none shadow-none",
                badgeClassName
              )}
              data-fixed={option.fixed}
              data-disabled={disabled || undefined}
            >
              <span>{option.label}</span>{" "}
              <button
                type="button"
                className="!ml-1 !p-0 !bg-transparent border-none shadow-none rounded-full !focus:outline-none dark:text-white/70 dark:hover:text-white flex items-center"
                style={{
                  fontSize: "12px",
                  lineHeight: "1",
                  width: "18px",
                  height: "18px",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleUnselect(option);
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(option)}
              >
                <X size={12} />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            {...inputProps}
            ref={inputRef}
            value={inputValue}
            disabled={disabled}
            onValueChange={(value) => {
              setInputValue(value);
              inputProps?.onValueChange?.(value);
            }}
            onBlur={() => {
              if (!onScrollbar) setOpen(false);
            }}
            onFocus={() => setOpen(true)}
            placeholder={
              hidePlaceholderWhenSelected && selected.length !== 0
                ? ""
                : placeholder
            }
            className={cn(
              "flex-2 !min-w-0 !p-0 bg-transparent outline-none dark:text-white/80 dark:placeholder-white/50",

              inputProps?.className
            )}
          />
          <button
            type="button"
            onClick={() => {
              const newFixed = selected.filter((s) => s.fixed);
              setSelected(newFixed);
              onChange?.(newFixed);
            }}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 p-0 rounded-full bg-muted hover:bg-foreground hover:text-background",
              (hideClearAllButton ||
                disabled ||
                selected.length < 1 ||
                selected.filter((s) => s.fixed).length === selected.length) &&
                "hidden"
            )}
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
      <div className="relative">
        {open && (
          <CommandList
            className="absolute top-1 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in"
            onMouseLeave={() => setOnScrollbar(false)}
            onMouseEnter={() => setOnScrollbar(true)}
            onMouseUp={() => inputRef?.current?.focus()}
          >
            {isLoading ? (
              <>{loadingIndicator}</>
            ) : (
              <>
                {EmptyItem()}
                {CreatableItem()}
                {!selectFirstItem && (
                  <CommandItem value="-" className="hidden" />
                )}
                {Object.entries(selectables).map(([key, dropdowns]) => (
                  <CommandGroup
                    key={key}
                    heading={key}
                    className="h-full overflow-auto"
                  >
                    {dropdowns.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.label}
                        disabled={option.disable}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={() => {
                          if (selected.length >= maxSelected) {
                            onMaxSelected?.(selected.length);
                            return;
                          }
                          setInputValue("");
                          const newOptions = [...selected, option];
                          setSelected(newOptions);
                          onChange?.(newOptions);
                        }}
                        className={cn(
                          "cursor-pointer",
                          option.disable &&
                            "cursor-default text-muted-foreground"
                        )}
                      >
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </>
            )}
          </CommandList>
        )}
      </div>
    </Command>
  );
});
MultipleSelector.displayName = "MultipleSelector";

export default MultipleSelector;
