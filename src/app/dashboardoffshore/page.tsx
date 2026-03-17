'use client';

import { useEffect, useState } from 'react';

interface EmailLog {
    id: number;
    email: string;
    timestamp: string;
    status: string;
}


export default function DashboardPage() {
    const [logs, setLogs] = useState<EmailLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/email-logs')
            .then((res) => res.json())
            .then((data) => {
                setLogs(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch logs:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="main-container">
            <div className="container">
                <div className="min-h-screen p-6 bg-gray-100">
                    <h1 className="text-3xl font-bold mb-6 text-center">📬 Email Delivery Dashboard</h1>

                    {loading ? (
                        <div className="text-center text-gray-600">Loading logs...</div>
                    ) : logs.length === 0 ? (
                        <div className="text-center text-gray-500">No email logs found.</div>
                    ) : (
                        <div className="overflow-x-auto shadow border rounded-lg bg-white">
                            <table className="min-w-full table-auto">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="px-4 py-2 text-left border-b">ID</th>
                                        <th className="px-4 py-2 text-left border-b">Email</th>
                                        <th className="px-4 py-2 text-left border-b">Timestamp</th>
                                        <th className="px-4 py-2 text-left border-b">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.map((log) => (
                                        <tr key={log.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border-b">{log.id}</td>
                                            <td className="px-4 py-2 border-b">{log.email}</td>
                                            <td className="px-4 py-2 border-b">
                                                {new Date(log.timestamp).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-2 border-b text-green-600 font-medium">
                                                {log.status || 'N/A'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
