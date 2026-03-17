'use client';

import { useEffect, useState } from 'react';

interface EmailLog {
    id: string; // MongoDB uses string IDs
    email: string;
    timestamp: string;
    status?: string;
    referrer?: string;
}

export default function DashboardPage() {
    const [logs, setLogs] = useState<EmailLog[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEmailLogs = async () => {
        try {
            setLoading(true);

            // Add cache-busting parameters
            const randomParam = Math.random().toString(36).substring(7);
            const timestamp = Date.now();

            console.log(`🔄 Fetching fresh data at ${new Date().toISOString()}`);

            const response = await fetch(`/api/email-logs?r=${randomParam}&t=${timestamp}`, {
                method: 'GET',
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`✅ Received ${data.length} email logs`);
            console.log('📊 Latest data:', data[0]?.email || 'No data');

            setLogs(data);

        } catch (error) {
            console.error('❌ Failed to fetch logs:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchEmailLogs();
    }, []);

    return (

        <div className="min-h-screen p-6 bg-gray-100">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center"> Email Delivery Dashboard</h1>

                {/* Control Panel */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={fetchEmailLogs}
                                disabled={loading}
                                className={`px-4 py-2 rounded-lg font-medium ${loading
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                                    }`}
                            >
                                {loading ? '🔄 Loading...' : '🔄 Refresh Data'}
                            </button>
                            <span className="text-sm text-gray-600">
                                📊 Total: {logs.length} emails
                            </span>
                        </div>

                    </div>
                </div>

                {/* Data Display */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <div className="text-gray-600">Loading fresh data...</div>
                    </div>
                ) : logs.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <div className="text-gray-500 text-lg">📭 No email logs found</div>
                        <p className="text-gray-400 mt-2">Try submitting an email through your signup form</p>
                        <button
                            onClick={fetchEmailLogs}
                            className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                        >
                            🔄 Check Again
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto shadow border rounded-lg bg-white">
                        <table className="min-w-full table-auto">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-4 py-2 text-left border-b font-semibold">#</th>
                                    <th className="px-4 py-2 text-left border-b font-semibold">Email</th>
                                    <th className="px-4 py-2 text-left border-b font-semibold">Timestamp</th>
                                    <th className="px-4 py-2 text-left border-b font-semibold">Status</th>
                                    <th className="px-4 py-2 text-left border-b font-semibold">Referrer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map((log, index) => (
                                    <tr key={log.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border-b text-gray-600">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-2 border-b font-medium">
                                            {log.email}
                                        </td>
                                        <td className="px-4 py-2 border-b text-gray-600">
                                            {new Date(log.timestamp).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-2 border-b">
                                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                {log.status || 'Delivered'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 border-b text-gray-600">
                                            {log.referrer || 'Direct'} {/* 👈 Show referrer */}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}


            </div>
        </div>
        //hello world
    );
}