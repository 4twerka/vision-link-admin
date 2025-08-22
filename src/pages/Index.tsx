import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Users, MousePointer, Link } from "lucide-react";
import { useState, useEffect } from "react";
import { getCampaignData, CampaignData } from "@/lib/firebase";

const Index = () => {
  const [campaignData, setCampaignData] = useState<CampaignData | null>(null);

  useEffect(() => {
    const loadCampaignData = async () => {
      const data = await getCampaignData();
      setCampaignData(data);
    };
    loadCampaignData();
  }, []);
  // Sample data based on the original dashboard
  const lineChartData = [
    { date: '04/04', subscribers: 0, clicks: 0 },
    { date: '06/04', subscribers: 15, clicks: 40 },
    { date: '08/04', subscribers: 25, clicks: 60 },
    { date: '10/04', subscribers: 35, clicks: 80 },
    { date: '12/04', subscribers: 45, clicks: 100 },
    { date: '14/04', subscribers: 55, clicks: 120 },
    { date: '16/04', subscribers: 65, clicks: 140 },
    { date: '18/04', subscribers: 75, clicks: 160 },
    { date: '20/04', subscribers: 85, clicks: 180 },
    { date: '22/04', subscribers: 96, clicks: 200 },
    { date: '24/04', subscribers: 96, clicks: 220 },
    { date: '26/04', subscribers: 96, clicks: 240 },
    { date: '28/04', subscribers: 96, clicks: 260 },
    { date: '30/04', subscribers: 96, clicks: 264 },
  ];

  const barChartData = [
    { date: '05/04', subscribers: 15 },
    { date: '06/04', subscribers: 10 },
    { date: '07/04', subscribers: 8 },
    { date: '09/04', subscribers: 12 },
    { date: '10/04', subscribers: 6 },
    { date: '11/04', subscribers: 5 },
    { date: '14/04', subscribers: 10 },
    { date: '15/04', subscribers: 8 },
    { date: '17/04', subscribers: 7 },
    { date: '18/04', subscribers: 9 },
    { date: '22/04', subscribers: 4 },
    { date: '08/05', subscribers: 2 },
    { date: '09/05', subscribers: 0 },
    { date: '14/07', subscribers: 0 },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
            {/* {campaignData?.profileImage || ""} */}
            <img 
              src="/avatarOnl.jpg" 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{campaignData?.title || "Always Love Lana"}</h1>
            <div className="text-sm text-muted-foreground space-y-1">
              {/* {campaignData?.creators} */}
              <p>Always_love_lana</p>
              {/* <p>Created at: {campaignData?.createdAt}</p> */}
              {/* <p className="text-emerald-600">Updated at: {campaignData?.updatedAt}</p> */}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Subscribed</CardTitle>
              <Users className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{campaignData?.totalSubscribed || 400}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Clicked</CardTitle>
              <MousePointer className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{campaignData?.totalClicked || 125}</div>
            </CardContent>
          </Card>
        </div>

        {/* OnlyFans Link */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link className="h-4 w-4" />
              {/* {campaignData?.onlyFansLink} */}
              <a href="https://onlyfans.com/always_love_lana/c1">Link Onlyfans</a>
            </div>
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Subscriptions Count and Clicks Count by Date</CardTitle>
            <p className="text-sm text-muted-foreground">
              The following graph shows how many fans subscribed and how many have just clicked on the promo, sorted by date since the start of the campaign.
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="subscribers" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Subscribers Count"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="clicks" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    name="Clicks Count"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Subscriptions Count</CardTitle>
            <p className="text-sm text-muted-foreground">
              The following graph shows how many fans subscribed via this campaign on each date/month
            </p>
            <div className="flex gap-4 text-sm">
              <button className="text-primary font-medium border-b-2 border-primary pb-1">Day View</button>
              <button className="text-muted-foreground">Month View</button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="subscribers" fill="#10b981" name="Subscribers Count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
