import { MapPin, Toolbox, User } from "lucide-react";

interface AvatarProps {
    name: string;
    category: string;
    address: string;
    image?: string;
    state?: string;
}

export default function Avatar({ name, category, address, image, state }: AvatarProps) {
    return (
        <div className="flex justify-between items-start mb-4">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-muted bg-muted shrink-0">
                {image === null
                    ?(<User className="w-full h-full object-cover" />)
                    :(<img src={image} alt={name} className="w-full h-full object-cover" />)}
              </div>
              <div>
                <div className="flex items-center mt-1 gap-3">
                  <h4 className="font-bold text-lg font-display group-hover:text-primary transition-colors">{name}</h4>
                  <span className={`flex items-center gap-1 ${state === 'busy'? 'bg-destructive-foreground text-destructive' :'bg-success text-success-foreground'} w-fit px-2 py-1 rounded text-sm font-semibold`}>{state}</span>
                </div>

                <div className="flex items-center text-sm text-muted-foreground mt-1 gap-3">
                  <span className="flex items-center gap-1"><Toolbox/> {category}</span>
                  <span className="flex items-center gap-1"><MapPin /> {address}</span>
                </div>
              </div>
            </div>
        </div>
    );
}