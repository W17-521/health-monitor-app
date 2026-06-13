import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout';
import { Heart, Chat, Share as ShareIcon, PaperPlaneTilt, Smiley } from '@phosphor-icons/react';

interface Comment { user: string; text: string; time: string; }
interface Post {
  id: string; user: string; avatar: string; time: string; content: string;
  tag: string; likes: number; comments: Comment[]; liked: boolean; img?: string;
}

const INITIAL_POSTS: Post[] = [
  { id:'p1',user:'健身小能手',avatar:'💪',time:'2小时前',content:'今日晨间体操打卡！坚持就是胜利 💪',tag:'唤醒身体',likes:32,comments:[{user:'运动达人',text:'一起加油！',time:'1小时前'},{user:'健康小白',text:'太厉害了👍',time:'30分钟前'}],liked:false },
  { id:'p2',user:'健康饮食家',avatar:'🥗',time:'5小时前',content:'推荐一个低卡早餐搭配：全麦面包+牛油果+鸡蛋，营养又美味！',tag:'健康餐',likes:56,comments:[{user:'吃货一枚',text:'明天就试试！',time:'3小时前'}],liked:true },
  { id:'p3',user:'跑步达人',avatar:'🏃',time:'8小时前',content:'今天跑了10公里！配速5:30，新纪录！',tag:'跑步打卡',likes:89,comments:[],liked:false },
  { id:'p4',user:'瑜伽女孩',avatar:'🧘',time:'12小时前',content:'每天15分钟晨间瑜伽，身体越来越柔软了~',tag:'瑜伽日常',likes:45,comments:[],liked:false },
];

const TOPICS = ['#7天体操挑战','#跑步打卡','#健康餐分享','#瑜伽日常','#减脂日记','#晨间运动','#夜跑一族'];

const EMOJI_LIST = ['😊','😂','❤️','👍','🎉','🔥','💪','🏃','🥗','🍎','✨','👏','😍','🤩','🥰','💕','🌟','🎯','🏆','📸'];

export function CommunityScreen() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'follow'|'recommend'|'topic'>('recommend');
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [showPublish, setShowPublish] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [commentingId, setCommentingId] = useState<string|null>(null);
  const [commentText, setCommentText] = useState('');
  const [topicFilter, setTopicFilter] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [shareMsg, setShareMsg] = useState('');

  const filteredPosts = topicFilter ? posts.filter((p) => p.tag.includes(topicFilter.replace('#',''))) : posts;

  const toggleLike = (id: string) => setPosts((prev) => prev.map((p) => p.id===id?{...p,liked:!p.liked,likes:p.liked?p.likes-1:p.likes+1}:p));

  const addComment = (id: string) => {
    if (!commentText.trim()) return;
    setPosts((prev) => prev.map((p) => p.id===id?{...p,comments:[...p.comments,{user:'我',text:commentText,time:'刚刚'}]}:p));
    setCommentText(''); setCommentingId(null);
  };

  const publish = () => {
    if (!newContent.trim()) return;
    setPosts([{
      id:`p${Date.now()}`,user:'我',avatar:'😊',time:'刚刚',
      content:newContent,tag:'#今日运动',likes:0,comments:[],liked:false
    },...posts]);
    setNewContent(''); setShowPublish(false);
  };

  const insertEmoji = (e: string) => setNewContent((prev) => prev + e);

  const handleShare = (post: Post) => {
    setShareMsg(`已复制 "${post.user}" 的动态链接`);
    setTimeout(() => setShareMsg(''), 2000);
  };

  return (
    <div>
      <PageHeader title="广场" rightAction={
        <button onClick={() => navigate('/community/messages')} className="text-sm text-accent-purple font-medium">✉️ 私信</button>
      }/>
      <div className="px-4 space-y-4 pb-8">
        {shareMsg && <div className="jelly-card p-3 text-center text-sm text-green-500">{shareMsg}</div>}

        {/* Tabs */}
        <div className="flex gap-6 px-1">
          {([['follow','关注'],['recommend','推荐'],['topic','话题']] as const).map(([k,v]) => (
            <button key={k} onClick={() => {setTab(k as 'follow'|'recommend'|'topic');setTopicFilter('');}} className={`text-sm font-semibold pb-2 transition-all ${tab===k?'text-accent-purple border-b-2 border-accent-purple':'text-gray-400'}`}>{v}</button>
          ))}
        </div>

        {/* Topics */}
        {tab==='topic' && (
          <div className="jelly-card p-4">
            <p className="text-sm font-semibold mb-2">热门话题</p>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((t) => (
                <button key={t} onClick={() => {setTab('recommend');setTopicFilter(t);}}
                  className={`jelly-btn px-3 py-1.5 text-xs font-medium transition-all ${topicFilter===t?'bg-purple-100 text-purple-600 ring-2 ring-purple-300':'text-purple-600'}`}>{t}</button>
              ))}
            </div>
          </div>
        )}

        {/* Posts */}
        {filteredPosts.map((post) => (
          <div key={post.id} className="jelly-card p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-xl shrink-0">{post.avatar}</div>
              <div className="flex-1 min-w-0"><p className="text-sm font-semibold">{post.user}</p><p className="text-xs text-gray-400">{post.time}</p></div>
              <button onClick={() => navigate('/community/messages')} className="jelly-btn px-3 py-1 text-xs text-accent-purple shrink-0">+ 关注</button>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-2">{post.content}</p>
            <button onClick={() => {setTab('recommend');setTopicFilter(post.tag);}} className="text-xs text-accent-purple bg-purple-50 px-2 py-0.5 rounded-full">{post.tag}</button>
            <div className="flex items-center gap-6 mt-3 pt-3 border-t border-gray-50">
              <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-pink-500 transition-colors">
                <Heart size={16} weight={post.liked?'fill':'regular'} className={post.liked?'text-pink-500':''}/><span>{post.likes}</span>
              </button>
              <button onClick={() => setCommentingId(commentingId===post.id?null:post.id)} className="flex items-center gap-1.5 text-xs text-gray-400">
                <Chat size={16}/><span>{post.comments.length}</span>
              </button>
              <button onClick={() => handleShare(post)} className="flex items-center gap-1.5 text-xs text-gray-400">
                <ShareIcon size={16}/><span>分享</span>
              </button>
            </div>
            {/* Comments */}
            {post.comments.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-50 space-y-2">
                {post.comments.map((c,i) => (
                  <div key={i} className="text-sm"><span className="font-medium text-gray-700">{c.user}</span><span className="text-gray-500 ml-2">{c.text}</span><span className="text-xs text-gray-300 ml-2">{c.time}</span></div>
                ))}
              </div>
            )}
            {/* Comment input */}
            {commentingId===post.id && (
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                <input value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="写评论..." className="flex-1 jelly-btn px-3 py-2 text-sm outline-none" onKeyDown={(e) => e.key==='Enter' && addComment(post.id)}/>
                <button onClick={() => addComment(post.id)} className="p-2 text-accent-purple"><PaperPlaneTilt size={18} weight="fill"/></button>
              </div>
            )}
          </div>
        ))}

        {/* Publish */}
        {!showPublish && <button onClick={() => setShowPublish(true)} className="w-full py-3 jelly-btn-primary text-sm flex items-center justify-center gap-2">➕ 发布动态</button>}
        {showPublish && (
          <div className="jelly-card p-4">
            <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} placeholder="分享你的运动瞬间..." rows={3} className="w-full jelly-btn p-3 text-sm resize-none outline-none mb-2"/>
            <div className="flex items-center gap-2 mb-3">
              <button onClick={() => setShowEmoji(!showEmoji)} className="jelly-btn p-2 text-lg"><Smiley size={20} className="text-gray-500"/></button>
              <span className="text-xs text-gray-400">表情</span>
            </div>
            {showEmoji && (
              <div className="flex flex-wrap gap-2 mb-3 p-3 bg-gray-50 rounded-xl max-h-32 overflow-y-auto">
                {EMOJI_LIST.map((e) => <button key={e} onClick={() => insertEmoji(e)} className="text-xl hover:scale-125 transition-transform active:scale-90">{e}</button>)}
              </div>
            )}
            <div className="flex gap-2">
              <button onClick={() => {setShowPublish(false);setShowEmoji(false);}} className="flex-1 py-2.5 jelly-btn text-sm text-gray-500">取消</button>
              <button onClick={publish} className="flex-1 py-2.5 jelly-btn-primary text-sm">发布</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
