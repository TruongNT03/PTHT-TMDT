import Head from "./Head";
import Body from "./Body";

const Table = ({ head }) => {
  return (
    <table className="w-full table-auto bg-transparent rounded-sm">
      <Head head={head} />
      <Body />
    </table>
  );
};

export default Table;
