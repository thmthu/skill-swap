"use client";

export default function UserCard({ name, skill, department }) {
  return (
    <div className="flex flex-col items-center p-6 border rounded-2xl bg-bg-light dark:bg-bg-dark shadow-md hover:shadow-lg transition-shadow">
      {/* Avatar */}
      <div className="h-16 w-16 mb-4 rounded-full bg-primary-light dark:bg-primary-medium flex items-center justify-center text-xl font-semibold text-primary-dark dark:text-primary">
        {name.charAt(0)}
      </div>

      {/* Name */}
      <h3 className="text-h3 font-bold text-text-light dark:text-text-dark">
        {name}
      </h3>

      {/* Skill */}
      <p className="text-body2 text-secondary-red-pink dark:text-secondary-light-pink mt-1">
        {skill}
      </p>

      {/* Department */}
      <p className="text-body2 text-gray-500 dark:text-gray-400">
        {department}
      </p>
    </div>
  );
}
