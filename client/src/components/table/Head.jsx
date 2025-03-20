const Head = ({ head }) => {
  return (
    <thead className="pb-10 border-b-[1px] border-black border-opacity-20">
      <tr>
        {head.map((value, index) => {
          return (
            <th key={index} className="pb-2 text-left">
              <div className="flex gap-1 items-center">
                <div>{value}</div>
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default Head;
