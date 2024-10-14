interface LoadmoreProps {
  state?: any;
  fetchDataFun: (params: { page: number }) => void;
}

const LoadMoreDataBtn: React.FC<LoadmoreProps> = ({ state, fetchDataFun }) => {
  if (
    state !== null &&
    state.result &&
    Array.isArray(state.result) &&
    state.totalDocs > state.result.length &&
    state.page
  ) {
    return (
      <button
        onClick={() => fetchDataFun({ page: state.page + 1 })}
        className="loadmore"
      >
        โหลดเพิ่มเติม
      </button>
    );
  }

  return null;
};

export default LoadMoreDataBtn;
