import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Lock, Save, Eye, EyeOff } from "lucide-react";
import { getCampaignData, saveCampaignData, CampaignData } from "@/lib/firebase";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  // Admin password
  const ADMIN_PASSWORD = "l1a2n3a4";

  // Campaign data state
  const [campaignData, setCampaignData] = useState<CampaignData>({
    title: "Campaign Metrics for may**********",
    creators: "@Lisa_Top_assist @kitty_kateee april 🌹",
    createdAt: "4 April 2025",
    updatedAt: "22 August 2025 09:40 am",
    totalSubscribed: 96,
    totalClicked: 264,
    onlyFansLink: "https://onlyfans.com/may**********/c1586",
    profileImage: "https://onlystruggles.s3.eu-west-2.amazonaws.com/sextforce/onlyfans/643de02fb29bef99dffc519c/avatar/q82z7hc5qw1ywrnu6c7ovahijpsfokdf1755685032/thumb.jpeg"
  });

  // Load campaign data from Firebase when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const loadData = async () => {
        const data = await getCampaignData();
        if (data) {
          setCampaignData(data);
        }
      };
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "Success",
        description: "Successfully logged into admin panel",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid password",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    // Update the updatedAt timestamp
    const updatedData = {
      ...campaignData,
      updatedAt: new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };
    
    const success = await saveCampaignData(updatedData);
    
    if (success) {
      setCampaignData(updatedData);
      toast({
        title: "Success",
        description: "Campaign data updated successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to save campaign data",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Admin Login</CardTitle>
            <p className="text-sm text-muted-foreground">
              Enter the admin password to access the dashboard
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Enter admin password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Button
            variant="outline"
            onClick={() => setIsAuthenticated(false)}
          >
            Logout
          </Button>
        </div>

        {/* Campaign Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Information</CardTitle>
            <p className="text-sm text-muted-foreground">
              Update the basic campaign information
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Campaign Title</Label>
                <Input
                  id="title"
                  value={campaignData.title}
                  onChange={(e) => setCampaignData({...campaignData, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="creators">Creators</Label>
                <Input
                  id="creators"
                  value={campaignData.creators}
                  onChange={(e) => setCampaignData({...campaignData, creators: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="createdAt">Created At</Label>
                <Input
                  id="createdAt"
                  value={campaignData.createdAt}
                  onChange={(e) => setCampaignData({...campaignData, createdAt: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="updatedAt">Updated At</Label>
                <Input
                  id="updatedAt"
                  value={campaignData.updatedAt}
                  onChange={(e) => setCampaignData({...campaignData, updatedAt: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="onlyFansLink">OnlyFans Link</Label>
              <Input
                id="onlyFansLink"
                value={campaignData.onlyFansLink}
                onChange={(e) => setCampaignData({...campaignData, onlyFansLink: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profileImage">Profile Image URL</Label>
              <Textarea
                id="profileImage"
                value={campaignData.profileImage}
                onChange={(e) => setCampaignData({...campaignData, profileImage: e.target.value})}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Metrics Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Metrics</CardTitle>
            <p className="text-sm text-muted-foreground">
              Update the campaign performance numbers
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="totalSubscribed">Total Subscribed</Label>
                <Input
                  id="totalSubscribed"
                  type="number"
                  value={campaignData.totalSubscribed}
                  onChange={(e) => setCampaignData({...campaignData, totalSubscribed: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalClicked">Total Clicked</Label>
                <Input
                  id="totalClicked"
                  type="number"
                  value={campaignData.totalClicked}
                  onChange={(e) => setCampaignData({...campaignData, totalClicked: parseInt(e.target.value)})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Admin;