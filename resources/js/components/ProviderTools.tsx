import React from 'react';
import ConfirmPanel from './ConfirmPanel';

interface ProviderToolsProps {
    providerState: string;
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ProviderTools({
    providerState,
    handleClick,
}: ProviderToolsProps) {
    const MAX_GALLERY = 20;

    return (
        <div className="mt-6 space-y-6">
            <section className="bg-card border-border rounded-xl border p-6 shadow-sm md:p-8">
                <h3 className="font-display mb-1 text-xl font-bold">
                    حالة التوفر
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                    حالتك الحالية:{' '}
                    <span
                        className={`font-bold ${providerState === 'busy' ? 'text-destructive-foreground' : 'text-success'}`}
                    >
                        {providerState === 'busy' ? 'مشغول' : 'متفرغ'}
                    </span>{' '}
                    — تظهر للعملاء في نتائج البحث وفي صفحتك.
                </p>
                <div className="grid max-w-sm grid-cols-2 gap-3">
                    {['busy', 'free'].map((state) => (
                        <button
                            key={state}
                            onClick={handleClick}
                            className={`rounded-lg border-2 py-3 font-bold transition-colors ${
                                state !== null
                                    ? state === 'busy'
                                        ? 'border-destructive bg-destructive/10 text-destructive-foreground'
                                        : 'border-success bg-success/10 text-success'
                                    : 'border-border hover:bg-muted'
                            }`}
                        >
                            {state === 'busy' ? 'مشغول' : 'متفرغ'}
                        </button>
                    ))}
                </div>
            </section>

            <section className="bg-card border-border rounded-xl border p-6 shadow-sm md:p-8">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-display text-xl font-bold">
                        معرض أعمالي
                    </h3>
                    {/* <span className="text-sm text-muted-foreground">{provider.gallery.length} / {MAX_GALLERY}</span> */}
                </div>
                {/* {uploadMsg && <div className="mb-3 p-3 bg-success/10 text-success rounded-lg flex items-center gap-2 text-sm font-bold"><CheckIcon /> {uploadMsg}</div>}
                {uploadErrors.length > 0 && (
                    <div className="mb-3 p-3 bg-destructive/10 text-destructive rounded-lg text-sm space-y-1">
                        {uploadErrors.map((er, i) => <p key={i} className="flex items-center gap-2"><AlertIcon /> {er}</p>)}
                    </div>
                )} */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {/* {provider.gallery.map((img: any) => (
                        <div key={img.id} className="relative group aspect-square">
                            <img src={img.url} alt={img.name} className="w-full h-full object-cover rounded-lg bg-muted" />
                            <button onClick={() => removeImage(img.id)} title="حذف الصورة" className="absolute top-1.5 left-1.5 p-1.5 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity hover:bg-destructive">
                                <XIcon />
                            </button>
                        </div>
                    ))} */}
                    {/* <label className={`aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-center text-muted-foreground text-xs gap-1 p-2 transition-colors ${full ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-muted/30 hover:border-primary'}`}>
                        <CameraIcon />
                        <span className="font-semibold text-sm">{full ? 'المعرض ممتلئ' : 'إضافة صور'}</span>
                        <span>JPG أو PNG، حتى 10 ميجابايت</span>
                        <input type="file" accept="image/jpeg,image/png" multiple disabled={full} onChange={handleFiles} className="hidden" />
                    </label> */}
                </div>
            </section>
        </div>
    );
}
