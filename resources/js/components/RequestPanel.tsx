import { useForm } from "@inertiajs/react";
import { Camera, XIcon } from "lucide-react";
import InputField from "./ui/InputField";
import TextFeild from "./TextFeild";
import InsertField from "./ui/InsertField";

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
interface RequestPanelProps {
  provider: Provider;
  displayRequest: (flag: boolean) => void;
}

export default function RequestPanel({ provider, displayRequest }: RequestPanelProps) {
  const { data, setData, post, processing, errors, reset, cancel } = useForm({
    description: "",
    photo: "",
    address: "",
    provider_id: provider.id,
  });

  function handleSubmint(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    post('/requests', {
      onSuccess: () => {
        reset();
        displayRequest(false);
      }
    });
  }

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
          <h3 className="font-bold font-display text-lg">طلب خدمة من {provider.name}</h3>
          <button onClick={() => displayRequest(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
            <XIcon />
          </button>
        </div>
        <form onSubmit={handleSubmint} className="p-6 space-y-4">
          
            <TextFeild 
              label="تفاصيل العمل (إلزامي)" 
              labelClassName="block text-sm font-semibold mb-1" 
              className={`w-full p-3 bg-muted/50 border rounded-lg outline-none focus:bg-card focus:ring-2 focus:ring-primary/50 transition-all ${errors.description ? 'border-destructive-foreground' : 'border-border'}`} 
              textPlaceholder="صف المشكلة أو الخدمة التي تحتاجها..."
              textValue={data.description}
              handleChange={e => setData({ ...data, description: e.target.value })}
              error={errors.description}
            />
            
          <div>
            <InputField 
              label="موقع التنفيذ (إلزامي)"
              labelClassName="block text-sm font-semibold mb-1"
              inputType="text"
              className={`w-full p-3 bg-muted/50 border rounded-lg outline-none focus:bg-card focus:ring-2 focus:ring-primary/50 transition-all ${errors.address ? 'border-destructive-foreground' : 'border-border'}`}
              inputPlaceholder="المدينة، الحي، الشارع..."
              inputValue={data.address}
              handleChange={e => setData({ ...data, address: e.target.value })}
              error={errors.address}
            />
          </div>

          <InsertField
            label="صورة توضيحية (اختياري)" 
            labelClassName="block text-sm font-semibold mb-1"
            className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/30 transition-colors cursor-pointer"
            icon={Camera}
            span="انقر لرفع صورة"
            spanClassName="text-sm mt-2"
          />
          
          <div className="pt-4 flex gap-3">
            <button type="submit" disabled={processing} className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors">
              إرسال الطلب
            </button>

            <button type="button" disabled={processing} onClick={() => {displayRequest(false); cancel()}} className="px-6 bg-card border border-border text-foreground py-3 rounded-lg font-bold hover:bg-muted transition-colors">
              إلغاء
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}