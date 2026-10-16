import { MessageSquareWarning, XIcon } from "lucide-react";
import React, { useState } from "react";
import Avatar from "./Avatar";
import ProviderGallery from "./ProviderGallery";
import ReviewsSection from "./ReviewsSection";
import ReportPanel from "./ReportPanel";
import RequestPanel from "./RequestPanel";
import ReviewPanel from "./ReviewPanel";

type Provider = {
  id: number;
  name: string
  category: number;
  address: string;
  nationality?: string;
  starAvg: number;
  state: string;
  avatar?: string;
}

type Photo = {
    id: number;
    photoNumber: number
    path?: string;
}

type Review = {
  providerId: number;
  customerId: number;
  rating: number;
  comment: string;
  date: string
}

type Request = {
  id: number;
  providerId: number;
  customerId: number;
}

type User = {
  userId: number;
  name: string;
}

interface ProviderDetailsProps {
  signedUserId: number;
  provider: Provider;
  users: User[];
  request: Request[];
  photos: Photo[];
  reviews: Review[];
  categoryName: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ProviderDetails({ signedUserId, provider, users, request, photos, categoryName, reviews, handleClick }: ProviderDetailsProps) {
  const [displayReport, setDisplayReport] = useState(false);
  const [displayRequest, setDisplayRequest] = useState(false);
  const [displayReview, setDisplayReview] = useState(false);

  const haveRequest = request.find((r) => r.customerId === signedUserId);
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">

        <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
          <h3 className="font-bold font-display text-lg">تفاصيل الفني والأعمال السابقة</h3>
          <button onClick={handleClick} className="p-2 hover:bg-muted rounded-full transition-colors">
            <XIcon />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <Avatar name={provider.name} address={provider.address} image={provider.avatar} category={categoryName} state={provider.state} />
        </div>

        <h4 className="font-semibold mb-3">معرض الأعمال السابقة</h4>
        <ProviderGallery photos={photos} />


        <h4 className="font-semibold mb-3 border-t border-border pt-4">المراجعات والتقييمات ({provider.starAvg} من 5 · {reviews.length} مراجعة)</h4>
        <ReviewsSection reviews={reviews} users={users}/>

        <div className="p-4 border-t border-border bg-muted/30 flex justify-between items-center">
          <button onClick={() => setDisplayReport(true)} className="flex items-center gap-2 text-sm text-destructive hover:bg-destructive/10 px-3 py-2 rounded-md transition-colors font-medium">
            <MessageSquareWarning /> الإبلاغ عن الفني
          </button>

          {!haveRequest
          ? (<button onClick={() => setDisplayReview(true)} className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors">
            قيّم الخدمة
          </button>)

          : (<button onClick={() => setDisplayRequest(true)} className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors">
            طلب خدمة الآن
          </button>)
          }
        </div>

        {displayReview && (
          <ReviewPanel provider={provider} displayReview={setDisplayReview} />
                
        )}

        {displayReport &&(
          <ReportPanel displayReport={setDisplayReport} provider={provider} />
        )}

        {displayRequest && (
          <RequestPanel provider={provider} displayRequest={setDisplayRequest} />
                
        )}
      </div>
    </div>
  );
}