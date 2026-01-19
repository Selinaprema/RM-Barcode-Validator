"use client";

export default function Button(props: {
  
  children: React.ReactNode;
}) {
  return (
    
    <button
      className="button"   
      type="submit"        
    >
      {/* Render whatever content is passed into the button */}
      {props.children}
    </button>
  );
}