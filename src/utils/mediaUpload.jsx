import { createClient } from "@supabase/supabase-js";

const anon_key = "sb_publishable_BXVw18vT1XYHWu6NOT536A_9OKUwP4_";
const supabaseUrl = "https://pizuqoxtldfccxmjmbzm.supabase.co";

const supabase = createClient(supabaseUrl, anon_key);

export default function MediaUpload(file){
    supabase.storage.from("images").upload(file.name, file, {
        cacheControl: "3600",
        upsert: false,
    }).then(()=>{
        const publicUrl = supabase.storage.from("images").getPublicUrl(file.name).data.publicUrl;
        console.log(publicUrl);
    })
}