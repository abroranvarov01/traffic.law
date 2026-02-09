export const Container = ({ children, className = "" }) => {
  return (
    <div className={`max-w-[1100px] w-[90%] mx-auto ${className}`}>
      {children}
    </div>
  );
};
