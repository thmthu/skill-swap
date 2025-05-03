export default function LayoutContainer({ children }) {
  return (
    <div className="max-w-[1512px] px-6 mx-auto grid grid-cols-12 gap-x-6">
      {children}
    </div>
  );
}
