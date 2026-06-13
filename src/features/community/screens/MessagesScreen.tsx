import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout';

interface Friend { name: string; avatar: string; lastMsg: string; time: string; online: boolean; }
interface Message { from: string; text: string; time: string; }

const FRIENDS: Friend[] = [
  { name:'健身小能手',avatar:'💪',lastMsg:'一起加油！',time:'1小时前',online:true },
  { name:'健康饮食家',avatar:'🥗',lastMsg:'明天试试你的食谱',time:'3小时前',online:true },
  { name:'跑步达人',avatar:'🏃',lastMsg:'周末约跑吗？',time:'昨天',online:false },
  { name:'瑜伽女孩',avatar:'🧘',lastMsg:'推荐一个瑜伽视频',time:'2天前',online:true },
];

const SUGGESTED: Friend[] = [
  { name:'减脂日记',avatar:'📝',lastMsg:'',time:'',online:false },
  { name:'游泳健将',avatar:'🏊',lastMsg:'',time:'',online:true },
  { name:'登山爱好者',avatar:'🧗',lastMsg:'',time:'',online:false },
];

export function MessagesScreen() {
  const navigate = useNavigate();
  const [chatWith, setChatWith] = useState<Friend|null>(null);
  const [msgs, setMsgs] = useState<Record<string,Message[]>>({});
  const [input, setInput] = useState('');
  const [searchAdd, setSearchAdd] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const filtered = SUGGESTED.filter((f) => f.name.includes(searchAdd));

  const openChat = (f: Friend) => {
    setChatWith(f);
    if (!msgs[f.name]) setMsgs((prev) => ({...prev,[f.name]:[{from:f.name,text:f.lastMsg||'你好！',time:f.time||'刚刚'}]}));
  };

  const send = () => {
    if (!input.trim() || !chatWith) return;
    setMsgs((prev) => ({...prev,[chatWith.name]:[...(prev[chatWith.name]||[]),{from:'我',text:input,time:'刚刚'}]}));
    setInput('');
  };

  if (chatWith) {
    return (
      <div className="flex flex-col h-[100dvh]">
        <PageHeader title={chatWith.name} leftAction={<button onClick={() => setChatWith(null)} className="text-sm text-gray-600">← 返回</button>} />
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
          {(msgs[chatWith.name]||[]).map((m,i) => (
            <div key={i} className={`flex ${m.from==='我'?'justify-end':'justify-start'}`}>
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${m.from==='我'?'bg-gradient-to-r from-blue-400 to-purple-400 text-white':'bg-gray-100 text-gray-700'}`}>{m.text}</div>
            </div>
          ))}
        </div>
        <div className="sticky bottom-0 px-4 py-3 bg-white/60 backdrop-blur-xl border-t border-gray-100 flex items-center gap-2"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)' }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key==='Enter'&&send()}
            placeholder="输入消息..." autoFocus
            className="flex-1 jelly-btn px-4 py-2.5 text-sm outline-none" />
          <button onClick={send} className="jelly-btn-primary px-5 py-2.5 text-sm rounded-xl shrink-0">发送</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="私信" leftAction={<button onClick={() => navigate(-1)} className="text-sm text-gray-600">← 返回</button>}
        rightAction={<button onClick={() => setShowAdd(!showAdd)} className="text-sm text-accent-purple font-medium">{showAdd?'取消':'+ 好友'}</button>}
      />
      <div className="px-4 space-y-3 pb-8">
        {showAdd && (
          <div className="jelly-card p-4">
            <input value={searchAdd} onChange={(e) => setSearchAdd(e.target.value)} placeholder="搜索用户..." className="w-full jelly-btn px-4 py-2.5 text-sm mb-3 outline-none"/>
            <div className="space-y-1">
              {filtered.map((f) => (
                <button key={f.name} onClick={() => {openChat(f);setShowAdd(false);}} className="w-full flex items-center gap-3 py-2.5 px-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-xl">{f.avatar}</div>
                  <div className="text-left"><p className="text-sm font-medium">{f.name}</p><p className="text-xs text-gray-400">{f.online?'在线':'离线'}</p></div>
                  <span className="ml-auto jelly-btn px-3 py-1 text-xs text-accent-purple">添加</span>
                </button>
              ))}
            </div>
          </div>
        )}
        {FRIENDS.map((f) => (
          <button key={f.name} onClick={() => openChat(f)} className="jelly-card p-4 w-full text-left flex items-center gap-3 active:scale-[0.98] transition-transform">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-2xl shrink-0 relative">
              {f.avatar}
              {f.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"/>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between"><p className="text-sm font-semibold">{f.name}</p><p className="text-xs text-gray-400">{f.time}</p></div>
              <p className="text-xs text-gray-500 truncate mt-1">{f.lastMsg}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
