import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout';

export function SettingsScreen() {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader
        title="设置"
        leftAction={
          <button onClick={() => navigate(-1)} className="text-sm text-gray-700">← 返回</button>
        }
      />
      <div className="px-4 py-12 text-center text-gray-400 text-sm">
        设置功能将在后续版本中完善
      </div>
    </div>
  );
}
