import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout';
import { Heart, Chat, Share } from '@phosphor-icons/react';

interface Post {
  id: string; user: string; avatar: string; time: string; content: string;
  tag: string; likes: number; comments: number; liked: boolean;
}

const MOCK_POSTS: Post[] = [
  { id: 'p1', user: '健身小能手', avatar: '💪', time: '2小时前', content: '今日晨间体操打卡！坚持就是胜利 💪', tag: '#唤醒身体', likes: 32, comments: 8, liked: false },
  { id: 'p2', user: '健康饮食家', avatar: '🥗', time: '5小时前', content: '推荐一个低卡早餐搭配：全麦面包+牛油果+鸡蛋，营养又美味！', tag: '#健康餐', likes: 56, comments: 12, liked: true },
  { id: 'p3', user: '跑步达人', avatar: '🏃', time: '8小时前', content: '今天跑了10公里！配速5:30，新纪录！', tag: '#跑步打卡', likes: 89, comments: 23, liked: false },
  { id: 'p4', user: '瑜伽女孩', avatar: '🧘', time: '12小时前', content: '每天15分钟晨间瑜伽，身体越来越柔软了~', tag: '#瑜伽日常', likes: 45, comments: 6, liked: false },
  { id: 'p5', user: '减脂日记', avatar: '📝', time: '1天前', content: '坚持30天打卡！从65kg减到60kg，继续加油！', tag: '#减脂打卡', likes: 120, comments: 34, liked: true },
];

const TOPICS = ['#7天体操挑战', '#跑步打卡', '#健康餐分享', '#瑜伽日常', '#减脂日记'];

export function CommunityScreen() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'follow' | 'recommend' | 'topic'>('recommend');
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [showPublish, setShowPublish] = useState(false);
  const [newContent, setNewContent] = useState('');

  const toggleLike = (id: string) => {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  };

  const publish = () => {
    if (!newContent.trim()) return;
    const newPost: Post = {
      id: `p${Date.now()}`, user: '我', avatar: '😊', time: '刚刚',
      content: newContent, tag: '#今日运动', likes: 0, comments: 0, liked: false,
    };
    setPosts([newPost, ...posts]);
    setNewContent('');
    setShowPublish(false);
  };

  return (
    <div>
      <PageHeader title="广场" />
      <div className="px-4 space-y-4 pb-8">
        {/* Tabs */}
        <div className="flex gap-4 px-1">
          {([['follow','关注'],['recommend','推荐'],['topic','话题']] as const).map(([k, v]) => (
            <button key={k} onClick={() => setTab(k)}
              className={`text-sm font-semibold pb-2 transition-all ${tab===k?'text-accent-purple border-b-2 border-accent-purple':'text-gray-400'}`}>
              {v}
            </button>
          ))}
        </div>

        {/* Topic cloud */}
        {tab === 'topic' && (
          <div className="jelly-card p-4">
            <p className="text-sm font-semibold mb-2">热门话题</p>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((t) => (
                <button key={t} className="jelly-btn px-3 py-1.5 text-xs text-purple-600 font-medium">{t}</button>
              ))}
            </div>
          </div>
        )}

        {/* Posts */}
        {posts.map((post) => (
          <div key={post.id} className="jelly-card p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-xl">{post.avatar}</div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{post.user}</p>
                <p className="text-xs text-gray-400">{post.time}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-2">{post.content}</p>
            <span className="text-xs text-accent-purple bg-purple-50 px-2 py-0.5 rounded-full">{post.tag}</span>
            <div className="flex items-center gap-6 mt-3 pt-3 border-t border-gray-50">
              <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-pink-500 transition-colors">
                <Heart size={16} weight={post.liked ? 'fill' : 'regular'} className={post.liked ? 'text-pink-500' : ''} />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 text-xs text-gray-400">
                <Chat size={16} /><span>{post.comments}</span>
              </button>
              <button className="flex items-center gap-1.5 text-xs text-gray-400">
                <Share size={16} /><span>分享</span>
              </button>
            </div>
          </div>
        ))}

        {/* Publish button */}
        {!showPublish && (
          <button onClick={() => setShowPublish(true)} className="w-full py-3 jelly-btn-primary text-sm flex items-center justify-center gap-2">
            ➕ 发布动态
          </button>
        )}

        {/* Publish form */}
        {showPublish && (
          <div className="jelly-card p-4">
            <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)}
              placeholder="分享你的运动瞬间..." rows={3}
              className="w-full jelly-btn p-3 text-sm resize-none outline-none mb-3" />
            <div className="flex gap-2">
              <button onClick={() => setShowPublish(false)} className="flex-1 py-2.5 jelly-btn text-sm text-gray-500">取消</button>
              <button onClick={publish} className="flex-1 py-2.5 jelly-btn-primary text-sm">发布</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
