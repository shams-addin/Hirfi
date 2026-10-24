import { MessageSquareWarning, XIcon } from 'lucide-react';
import React, { useState } from 'react';
import Avatar from './Avatar';
import ProviderGallery from './ProviderGallery';
import ReviewsSection from './ReviewsSection';
import ReportPanel from './ReportPanel';
import RequestPanel from './RequestPanel';
import ReviewPanel from './ReviewPanel';

type Provider = {
    id: number;
    name: string;
    category: number;
    address: string;
    nationality?: string;
    starAvg: number;
    state: string;
    avatar?: string;
};

type Photo = {
    id: number;
    photoNumber: number;
    path?: string;
};

type Review = {
    providerId: number;
    customerId: number;
    rating: number;
    comment: string;
    date: string;
};

type Request = {
    id: number;
    providerId: number;
    customerId: number;
};

type User = {
    userId: number;
    name: string;
};

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

export default function ProviderDetails({
    signedUserId,
    provider,
    users,
    request,
    photos,
    categoryName,
    reviews,
    handleClick,
}: ProviderDetailsProps) {
    const [displayReport, setDisplayReport] = useState(false);
    const [displayRequest, setDisplayRequest] = useState(false);
    const [displayReview, setDisplayReview] = useState(false);

    const haveRequest = request.find((r) => r.customerId === signedUserId);
    return (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 duration-200">
            <div className="bg-card flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl shadow-2xl">
                <div className="border-border bg-muted/30 flex items-center justify-between border-b p-4">
                    <h3 className="font-display text-lg font-bold">
                        تفاصيل الفني والأعمال السابقة
                    </h3>
                    <button
                        onClick={handleClick}
                        className="hover:bg-muted rounded-full p-2 transition-colors"
                    >
                        <XIcon />
                    </button>
                </div>

                <div className="overflow-y-auto p-6">
                    <Avatar
                        name={provider.name}
                        address={provider.address}
                        image={provider.avatar}
                        category={categoryName}
                        state={provider.state}
                    />
                </div>

                <h4 className="mb-3 font-semibold">معرض الأعمال السابقة</h4>
                <ProviderGallery photos={photos} />

                <h4 className="border-border mb-3 border-t pt-4 font-semibold">
                    المراجعات والتقييمات ({provider.starAvg} من 5 ·{' '}
                    {reviews.length} مراجعة)
                </h4>
                <ReviewsSection reviews={reviews} users={users} />

                <div className="border-border bg-muted/30 flex items-center justify-between border-t p-4">
                    <button
                        onClick={() => setDisplayReport(true)}
                        className="text-destructive-foreground hover:bg-destructive-foreground/10 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors"
                    >
                        <MessageSquareWarning /> الإبلاغ عن الفني
                    </button>

                    {!haveRequest ? (
                        <button
                            onClick={() => setDisplayReview(true)}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-2 font-bold transition-colors"
                        >
                            قيّم الخدمة
                        </button>
                    ) : (
                        <button
                            onClick={() => setDisplayRequest(true)}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-2 font-bold transition-colors"
                        >
                            طلب خدمة الآن
                        </button>
                    )}
                </div>

                {displayReview && (
                    <ReviewPanel
                        provider={provider}
                        displayReview={setDisplayReview}
                    />
                )}

                {displayReport && (
                    <ReportPanel
                        displayReport={setDisplayReport}
                        provider={provider}
                    />
                )}

                {displayRequest && (
                    <RequestPanel
                        provider={provider}
                        displayRequest={setDisplayRequest}
                    />
                )}
            </div>
        </div>
    );
}
