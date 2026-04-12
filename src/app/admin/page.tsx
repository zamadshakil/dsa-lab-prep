"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, Users, Clock, MousePointerClick, Monitor, Smartphone, Battery,
  Moon, Sun, Globe, Copy, Camera, Activity, RefreshCw, Lock, ArrowLeft,
  Zap, TrendingUp, Map
} from "lucide-react";
import Link from "next/link";

const ADMIN_PASSWORD = "zamdev2026";

interface Session {
  session_id: string;
  visitor_id: string;
  first_seen_at: string;
  user_agent: string;
  browser_info: any;
  os_info: any;
  screen_resolution: string;
  window_resolution: string;
  time_zone: string;
  locale: string;
  device_memory: number | null;
  hardware_concurrency: number | null;
  network_type: string | null;
  referrer: string;
  current_url: string;
  battery_level: number | null;
  is_charging: boolean | null;
  dark_mode_active: boolean | null;
  snapshot_url: string | null;
  camera_consent: boolean | null;
}

interface PageView {
  id: string;
  visitor_id: string;
  path: string;
  started_at: string;
  duration_seconds: number | null;
  max_scroll_depth_percent: number | null;
  rage_clicks: number | null;
}

interface Event {
  id: string;
  session_id: string;
  event_type: string;
  element_target: string | null;
  metadata: any;
  created_at: string;
}

function parseOS(ua: string): string {
  if (/Windows/.test(ua)) return "Windows";
  if (/Mac/.test(ua)) return "macOS";
  if (/iPhone|iPad/.test(ua)) return "iOS";
  if (/Android/.test(ua)) return "Android";
  if (/Linux/.test(ua)) return "Linux";
  return "Unknown";
}

function parseBrowser(ua: string): string {
  if (/Edg\//.test(ua)) return "Edge";
  if (/Chrome/.test(ua)) return "Chrome";
  if (/Firefox/.test(ua)) return "Firefox";
  if (/Safari/.test(ua)) return "Safari";
  return "Unknown";
}

function isMobile(ua: string): boolean {
  return /iPhone|iPad|Android|Mobile/.test(ua);
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// ─── STAT CARD ─────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color = "blue" }: {
  icon: any; label: string; value: string | number; sub?: string; color?: string;
}) {
  const colors: Record<string, string> = {
    blue: "from-blue-500 to-blue-600 shadow-blue-200",
    violet: "from-violet-500 to-purple-600 shadow-violet-200",
    emerald: "from-emerald-500 to-green-600 shadow-emerald-200",
    amber: "from-amber-500 to-orange-600 shadow-amber-200",
    rose: "from-rose-500 to-pink-600 shadow-rose-200",
    cyan: "from-cyan-500 to-teal-600 shadow-cyan-200",
  };
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center shadow-lg flex-shrink-0`}>
        <Icon size={18} className="text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-[22px] font-bold text-slate-900 leading-tight mt-0.5">{value}</p>
        {sub && <p className="text-[11px] text-slate-400 mt-0.5 truncate">{sub}</p>}
      </div>
    </div>
  );
}

// ─── MAIN ADMIN PAGE ───────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sessions, setSessions] = useState<Session[]>([]);
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [sessRes, pvRes, evRes] = await Promise.all([
      supabase.from("visitor_sessions").select("*").order("first_seen_at", { ascending: false }).limit(200),
      supabase.from("visitor_page_views").select("*").order("started_at", { ascending: false }).limit(500),
      supabase.from("visitor_events").select("*").order("created_at", { ascending: false }).limit(500),
    ]);
    if (sessRes.data) setSessions(sessRes.data);
    if (pvRes.data) setPageViews(pvRes.data);
    if (evRes.data) setEvents(evRes.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) fetchData();
  }, [authed, fetchData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  // ─── LOGIN GATE ────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-8 w-full max-w-[380px] shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Lock size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-[16px] font-bold text-white">Admin Access</h1>
              <p className="text-[11px] text-slate-500 font-medium">ZamDev AI · Telemetry Dashboard</p>
            </div>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-[14px] placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 mb-3"
              autoFocus
            />
            {error && <p className="text-[12px] text-red-400 mb-3">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-[14px] font-semibold rounded-xl hover:from-blue-700 hover:to-violet-700 transition-all shadow-lg shadow-blue-900/30"
            >
              Authenticate
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ─── COMPUTED STATS ────────────────────────────
  const uniqueVisitors = new Set(sessions.map((s) => s.visitor_id)).size;
  const mobileCount = sessions.filter((s) => isMobile(s.user_agent || "")).length;
  const desktopCount = sessions.length - mobileCount;
  const darkModeCount = sessions.filter((s) => s.dark_mode_active).length;
  const avgBattery = sessions.filter((s) => s.battery_level !== null).length > 0
    ? Math.round(sessions.filter((s) => s.battery_level !== null).reduce((a, s) => a + (s.battery_level || 0), 0) / sessions.filter((s) => s.battery_level !== null).length)
    : null;
  const copyEvents = events.filter((e) => e.event_type === "copy_code").length;
  const rageEvents = events.filter((e) => e.event_type === "rage_click_detected").length;
  const snapshotCount = sessions.filter((s) => s.snapshot_url).length;
  const topPages = Object.entries(
    pageViews.reduce<Record<string, number>>((acc, pv) => { acc[pv.path] = (acc[pv.path] || 0) + 1; return acc; }, {})
  ).sort(([, a], [, b]) => b - a).slice(0, 8);
  const referrers = Object.entries(
    sessions.reduce<Record<string, number>>((acc, s) => { const r = s.referrer || "direct"; acc[r] = (acc[r] || 0) + 1; return acc; }, {})
  ).sort(([, a], [, b]) => b - a).slice(0, 5);
  const timeZones = Object.entries(
    sessions.reduce<Record<string, number>>((acc, s) => { acc[s.time_zone || "Unknown"] = (acc[s.time_zone || "Unknown"] || 0) + 1; return acc; }, {})
  ).sort(([, a], [, b]) => b - a).slice(0, 5);

  // ─── DASHBOARD ─────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Nav */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-[16px] font-bold text-slate-900 flex items-center gap-2">
                <Activity size={16} className="text-blue-600" />
                Telemetry Dashboard
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">ZamDev AI · Admin Panel</p>
            </div>
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-[13px] font-medium text-slate-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Users} label="Total Sessions" value={sessions.length} sub={`${uniqueVisitors} unique visitors`} color="blue" />
          <StatCard icon={Eye} label="Page Views" value={pageViews.length} color="violet" />
          <StatCard icon={Copy} label="Code Copies" value={copyEvents} color="emerald" />
          <StatCard icon={MousePointerClick} label="Rage Clicks" value={rageEvents} sub="Frustration events" color="rose" />
          <StatCard icon={Camera} label="Snapshots" value={snapshotCount} sub={`of ${sessions.length} sessions`} color="cyan" />
          <StatCard icon={Battery} label="Avg Battery" value={avgBattery !== null ? `${avgBattery}%` : "N/A"} color="amber" />
          <StatCard icon={Moon} label="Dark Mode" value={`${darkModeCount}`} sub={`${sessions.length > 0 ? Math.round((darkModeCount / sessions.length) * 100) : 0}% of users`} color="violet" />
          <StatCard icon={Smartphone} label="Mobile / Desktop" value={`${mobileCount} / ${desktopCount}`} color="blue" />
        </div>

        {/* Two-Column Layout */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Top Pages */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden lg:col-span-2">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
              <TrendingUp size={15} className="text-blue-600" />
              <h2 className="text-[14px] font-bold text-slate-900">Top Pages</h2>
            </div>
            <div className="divide-y divide-slate-50">
              {topPages.map(([path, count]) => (
                <div key={path} className="px-6 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <span className="text-[13px] font-mono text-slate-700 font-medium">{path}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(count / (topPages[0]?.[1] || 1)) * 100}%` }} />
                    </div>
                    <span className="text-[12px] font-bold text-slate-500 w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
              {topPages.length === 0 && <p className="px-6 py-8 text-[13px] text-slate-400 text-center">No page views yet</p>}
            </div>
          </div>

          {/* Right Column: Referrers + Timezones */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
                <Globe size={15} className="text-emerald-600" />
                <h2 className="text-[14px] font-bold text-slate-900">Traffic Sources</h2>
              </div>
              <div className="divide-y divide-slate-50">
                {referrers.map(([ref, count]) => (
                  <div key={ref} className="px-5 py-3 flex justify-between">
                    <span className="text-[12px] text-slate-600 truncate max-w-[180px]">{ref}</span>
                    <span className="text-[12px] font-bold text-slate-500">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
                <Map size={15} className="text-violet-600" />
                <h2 className="text-[14px] font-bold text-slate-900">Time Zones</h2>
              </div>
              <div className="divide-y divide-slate-50">
                {timeZones.map(([tz, count]) => (
                  <div key={tz} className="px-5 py-3 flex justify-between">
                    <span className="text-[12px] text-slate-600 truncate max-w-[180px]">{tz}</span>
                    <span className="text-[12px] font-bold text-slate-500">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Session Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor size={15} className="text-blue-600" />
              <h2 className="text-[14px] font-bold text-slate-900">All Sessions</h2>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">{sessions.length} total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60">
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Photo</th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visitor</th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">When</th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Device</th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">OS / Browser</th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Screen</th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Battery</th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Theme</th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Referrer</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s) => (
                  <tr
                    key={s.session_id}
                    onClick={() => setSelectedSession(s)}
                    className="border-b border-slate-50 last:border-0 hover:bg-blue-50/40 cursor-pointer transition-colors"
                  >
                    <td className="px-5 py-3">
                      {s.snapshot_url ? (
                        <img src={s.snapshot_url} alt="" className="w-9 h-9 rounded-lg object-cover border border-slate-200 shadow-sm" />
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
                          <Camera size={12} className="text-slate-300" />
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-[11px] font-mono text-slate-500">{s.visitor_id.slice(0, 8)}...</span>
                    </td>
                    <td className="px-5 py-3 text-[12px] text-slate-500">{timeAgo(s.first_seen_at)}</td>
                    <td className="px-5 py-3">
                      {isMobile(s.user_agent || "") ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                          <Smartphone size={10} /> Mobile
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                          <Monitor size={10} /> Desktop
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-[12px] text-slate-600">
                      {parseOS(s.user_agent || "")} · {parseBrowser(s.user_agent || "")}
                    </td>
                    <td className="px-5 py-3 text-[12px] font-mono text-slate-500">{s.screen_resolution}</td>
                    <td className="px-5 py-3">
                      {s.battery_level !== null ? (
                        <span className="flex items-center gap-1 text-[12px] text-slate-600">
                          <Battery size={12} className={s.battery_level < 20 ? "text-red-500" : "text-green-500"} />
                          {s.battery_level}%
                          {s.is_charging && <Zap size={10} className="text-amber-500" />}
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      {s.dark_mode_active ? (
                        <Moon size={14} className="text-violet-500" />
                      ) : s.dark_mode_active === false ? (
                        <Sun size={14} className="text-amber-500" />
                      ) : (
                        <span className="text-[11px] text-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-[11px] text-slate-400 truncate max-w-[120px]">{s.referrer || "direct"}</td>
                  </tr>
                ))}
                {sessions.length === 0 && (
                  <tr><td colSpan={9} className="px-6 py-12 text-center text-[13px] text-slate-400">No session data yet. Visit the dashboard to generate data.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Events Feed */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <Zap size={15} className="text-amber-500" />
            <h2 className="text-[14px] font-bold text-slate-900">Live Event Feed</h2>
            <span className="text-[11px] bg-slate-100 text-slate-400 px-2 py-0.5 rounded-md font-medium ml-2">{events.length}</span>
          </div>
          <div className="divide-y divide-slate-50 max-h-[400px] overflow-y-auto">
            {events.slice(0, 50).map((ev) => (
              <div key={ev.id} className="px-6 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    ev.event_type === "copy_code" ? "bg-emerald-500" :
                    ev.event_type === "rage_click_detected" ? "bg-red-500" :
                    ev.event_type === "sidebar_click" ? "bg-blue-500" :
                    ev.event_type === "tab_blur" ? "bg-amber-400" :
                    ev.event_type === "tab_focus" ? "bg-green-400" :
                    "bg-slate-300"
                  }`} />
                  <span className="text-[12px] font-mono font-medium text-slate-700">{ev.event_type}</span>
                  {ev.metadata && (
                    <span className="text-[11px] text-slate-400 truncate max-w-[250px]">
                      {JSON.stringify(ev.metadata).slice(0, 60)}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 flex-shrink-0 ml-4">{timeAgo(ev.created_at)}</span>
              </div>
            ))}
            {events.length === 0 && <p className="px-6 py-8 text-[13px] text-slate-400 text-center">No events captured yet</p>}
          </div>
        </div>
      </div>

      {/* Session Detail Modal */}
      <AnimatePresence>
        {selectedSession && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setSelectedSession(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-[520px] w-full max-h-[90vh] overflow-y-auto border border-slate-200"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-[15px] font-bold text-slate-900">Session Detail</h3>
                <button onClick={() => setSelectedSession(null)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400">✕</button>
              </div>
              <div className="p-6 space-y-5">
                {selectedSession.snapshot_url && (
                  <div className="flex justify-center">
                    <img src={selectedSession.snapshot_url} alt="Visitor snapshot" className="w-40 h-40 rounded-2xl object-cover border-2 border-slate-200 shadow-lg" />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3 text-[12px]">
                  {[
                    ["Visitor ID", selectedSession.visitor_id.slice(0, 16) + "..."],
                    ["Session ID", selectedSession.session_id.slice(0, 16) + "..."],
                    ["OS", parseOS(selectedSession.user_agent || "")],
                    ["Browser", parseBrowser(selectedSession.user_agent || "")],
                    ["Screen", selectedSession.screen_resolution],
                    ["Window", selectedSession.window_resolution],
                    ["Timezone", selectedSession.time_zone],
                    ["Locale", selectedSession.locale],
                    ["Memory", selectedSession.device_memory ? `${selectedSession.device_memory} GB` : "N/A"],
                    ["CPU Cores", selectedSession.hardware_concurrency?.toString() || "N/A"],
                    ["Network", selectedSession.network_type || "N/A"],
                    ["Battery", selectedSession.battery_level !== null ? `${selectedSession.battery_level}%${selectedSession.is_charging ? " ⚡" : ""}` : "N/A"],
                    ["Dark Mode", selectedSession.dark_mode_active === null ? "N/A" : selectedSession.dark_mode_active ? "Yes 🌙" : "No ☀️"],
                    ["Camera", selectedSession.camera_consent ? "Allowed ✅" : "Denied"],
                    ["Referrer", selectedSession.referrer || "direct"],
                    ["First Seen", new Date(selectedSession.first_seen_at).toLocaleString()],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-slate-50 rounded-xl px-3.5 py-2.5 border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
                      <p className="text-[13px] font-medium text-slate-700 mt-0.5 truncate">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">User Agent</p>
                  <p className="text-[11px] font-mono text-slate-300 break-all leading-relaxed">{selectedSession.user_agent}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
