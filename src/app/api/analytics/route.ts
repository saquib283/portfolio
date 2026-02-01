import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Analytics from '@/models/Analytics';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// POST: Track a page view
export async function POST(req: NextRequest) {
    try {
        const { path } = await req.json();
        if (!path) return NextResponse.json({ error: 'Path required' }, { status: 400 });

        await connectToDatabase();

        const today = new Date().toISOString().split('T')[0];

        // Upsert by path and get the document
        let record = await Analytics.findOneAndUpdate(
            { path },
            {
                $inc: { views: 1 },
                $set: { lastVisited: new Date() },
            },
            { upsert: true, new: true }
        );

        if (record) {
            const dayStatIndex = record.dailyStats.findIndex((s: any) => s.date === today);

            if (dayStatIndex > -1) {
                record.dailyStats[dayStatIndex].count += 1;
            } else {
                record.dailyStats.push({ date: today, count: 1 });
                // Keep only last 30 days to avoid infinite growth
                if (record.dailyStats.length > 30) record.dailyStats.shift();
            }
            await record.save();
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
    }
}

// GET: Fetch analytics (Admin only)
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();

        // Aggregate total views per day across all paths
        const allStats = await Analytics.find({});

        const totalViews = allStats.reduce((acc, curr) => acc + curr.views, 0);

        // Group by day for the chart
        const dailyMap: Record<string, number> = {};
        allStats.forEach(page => {
            page.dailyStats.forEach((day: any) => {
                dailyMap[day.date] = (dailyMap[day.date] || 0) + day.count;
            });
        });

        const chartData = Object.entries(dailyMap)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([date, count]) => ({ date, views: count }))
            .slice(-7); // Last 7 days

        const topPages = allStats
            .sort((a, b) => b.views - a.views)
            .slice(0, 5)
            .map(p => ({ path: p.path, views: p.views }));

        return NextResponse.json({ totalViews, chartData, topPages });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }
}
