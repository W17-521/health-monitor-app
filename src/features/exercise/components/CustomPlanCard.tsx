export function CustomPlanCard() {
  return (
    <div className="bg-white rounded-card p-4 shadow-sm text-center">
      <p className="text-sm text-gray-600 mb-3">根据你的体能水平，生成专属体操组合</p>
      <button
        className="px-6 py-2 bg-primary text-white rounded-btn text-sm font-medium active:scale-[0.98] transition-transform"
      >
        生成训练计划
      </button>
    </div>
  );
}
