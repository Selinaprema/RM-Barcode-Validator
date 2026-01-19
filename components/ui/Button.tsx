"use client";

// Reusable button component used for form submission
export default function Button(props: {
  // Content displayed inside the button (e.g. "Submit")
  children: React.ReactNode;
}) {
  return (
    // Native HTML button element
    <button
      className="button"   // CSS class used for styling
      type="submit"        // Submits the parent form when clicked
    >
      {/* Render whatever content is passed into the button */}
      {props.children}
    </button>
  );
}
