import { useState } from 'react';
import Avatar from './Avatar';
import { usePage } from '@inertiajs/react';
import Badge from './Badge';
import ProviderDetails from './ProviderDetails';
import RequestPanel from './RequestPanel';
import { Star } from 'lucide-react';

type Category = {
    category_id: number;
    category_name: string;
};

type GalleryPhoto = {
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

type User = {
    userId: number;
    name: string;
};

type Request = {
    id: number;
    providerId: number;
    customerId: number;
};

interface ProviderCardProps {
    provider: Provider;
}

export default function ProviderCard({ provider }: ProviderCardProps) {
    const [displayDetails, setDisplayDetails] = useState(false);
    const [displayRequest, setDisplayRequest] = useState(false);
    const { categories, galleries, reviews, users, requests, signedUserId } =
        usePage<{
            signedUserId: number;
            categories: Category[];
            galleries: GalleryPhoto[];
            reviews: Review[];
            users: User[];
            requests: Request[];
        }>().props;

    // TODO
    const categoryName =
        categories.find(
            (category) => category.category_id === provider.category,
        )?.category_name ?? ' ';

    const providerRequest = requests.filter(
        (request) => request.providerId === provider.id,
    );
    const providerPhotos = galleries.filter(
        (photo) => photo.id === provider.id,
    );
    const providerReviews = reviews.filter(
        (review) => review.providerId === provider.id,
    );

    return (
        <>
            <div className="bg-card border-border group flex flex-col overflow-hidden rounded-xl border shadow-sm transition-shadow hover:shadow-md">
                <div className="flex-1 p-5">
                    <Avatar
                        name={provider.name}
                        category={categoryName}
                        address={provider.address}
                        image={provider.avatar}
                        state={provider.state}
                    />

                    <Badge color="blue">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {provider.starAvg}
                    </Badge>
                </div>

                <div className="bg-muted/30 border-border flex gap-3 border-t p-4">
                    <button
                        disabled={provider.state === 'busy'}
                        onClick={() => setDisplayRequest(true)}
                        className={`flex-1 ${provider.state === 'busy' ? 'bg-muted text-muted-foreground border-border border' : 'hover:bg-primary/90 transition-colors'} rounded-lg py-2 text-sm font-bold`}
                    >
                        طلب خدمة
                    </button>

                    <button
                        onClick={() => setDisplayDetails(true)}
                        className="bg-card border-border text-foreground hover:bg-muted flex-1 rounded-lg border py-2 text-sm font-bold transition-colors"
                    >
                        التفاصيل والأعمال
                    </button>
                </div>
            </div>

            {displayDetails && (
                <ProviderDetails
                    provider={provider}
                    photos={providerPhotos}
                    reviews={providerReviews}
                    request={providerRequest}
                    users={users}
                    categoryName={categoryName}
                    handleClick={() => setDisplayDetails(!displayDetails)}
                    signedUserId={signedUserId}
                />
            )}

            {displayRequest && (
                <RequestPanel
                    provider={provider}
                    displayRequest={setDisplayRequest}
                />
            )}
        </>
    );
}
