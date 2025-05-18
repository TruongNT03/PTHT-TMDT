import { LineChart } from "@mui/x-charts/LineChart";

const Dashboard = () => {
  return (
    <div className="p-8 flex-1">
      <div className="text-2xl font-semibold mb-5">Dashboard</div>
      <div className="flex gap-10 text-xl text-white">
        <div className="flex-1 border rounded-lg text-center py-8 bg-primary">
          <div>Tổng sản phẩm</div>
          <div>20</div>
        </div>
        <div className="flex-1 border rounded-lg text-center py-8 bg-primary">
          <div>Tổng đơn hàng</div>
          <div>20</div>
        </div>
        <div className="flex-1 border rounded-lg text-center py-8 bg-primary">
          <div>Tổng doanh thu</div>
          <div>20</div>
        </div>
        <div className="flex-1 border rounded-lg text-center py-8 bg-primary">
          <div>Tổng doanh thu trong tháng</div>
          <div>20</div>
        </div>
      </div>
      <div className="h-[550px] w-full">
        <div className="my-5">Biểu đồ doanh thu trong tháng</div>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
              valueFormatter: (value) =>
                value == null ? "NaN" : value.toString(),
            },
            {
              data: [null, null, null, null, 5.5, 2, 8.5, 1.5, 5],
            },
            {
              data: [7, 8, 5, 4, null, null, 2, 5.5, 1],
              valueFormatter: (value) =>
                value == null ? "?" : value.toString(),
            },
          ]}
          height={500}
          margin={{ bottom: 10 }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
