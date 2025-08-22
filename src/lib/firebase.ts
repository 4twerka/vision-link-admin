import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCno52psQICNnio-LZCtEb0bNxoYbKjGWU",
  authDomain: "vision-da1af.firebaseapp.com",
  projectId: "vision-da1af",
  storageBucket: "vision-da1af.firebasestorage.app",
  messagingSenderId: "1091189611207",
  appId: "1:1091189611207:web:1299170e28279b5449fce2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export interface CampaignData {
  title: string;
  creators: string;
  createdAt: string;
  updatedAt: string;
  totalSubscribed: number;
  totalClicked: number;
  onlyFansLink: string;
  profileImage: string;
}

// Save campaign data to Firebase
export const saveCampaignData = async (data: CampaignData) => {
  try {
    await setDoc(doc(db, "campaigns", "main"), data);
    return true;
  } catch (error) {
    console.error("Error saving campaign data:", error);
    return false;
  }
};

// Get campaign data from Firebase
export const getCampaignData = async (): Promise<CampaignData | null> => {
  try {
    const docRef = doc(db, "campaigns", "main");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as CampaignData;
    } else {
      // Return default data if no document exists
      return {
        title: "Campaign Metrics for may**********",
        creators: "@Lisa_Top_assist @kitty_kateee april 🌹",
        createdAt: "4 April 2025",
        updatedAt: "22 August 2025 09:40 am",
        totalSubscribed: 96,
        totalClicked: 264,
        onlyFansLink: "https://onlyfans.com/may**********/c1586",
        profileImage: "https://onlystruggles.s3.eu-west-2.amazonaws.com/sextforce/onlyfans/643de02fb29bef99dffc519c/avatar/q82z7hc5qw1ywrnu6c7ovahijpsfokdf1755685032/thumb.jpeg"
      };
    }
  } catch (error) {
    console.error("Error getting campaign data:", error);
    return null;
  }
};