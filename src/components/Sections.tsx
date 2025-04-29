interface SectionsProps {
    isFirst: boolean;
    isLast: boolean;
    onPrev: () => void;
    onNext: () => void;
    onSubmit: () => void;
  }
  
  function Sections({ isFirst, isLast, onPrev, onNext, onSubmit }: SectionsProps) {
    return (
      <div className="flex justify-between mt-6">
        {!isFirst && (
          <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={onPrev}>
            Prev
          </button>
        )}
        {!isLast && (
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={onNext}>
            Next
          </button>
        )}
        {isLast && (
          <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={onSubmit}>
            Submit
          </button>
        )}
      </div>
    );
  }
  
  export default Sections;
  