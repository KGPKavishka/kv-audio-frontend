import { createClient } from "@supabase/supabase-js";

const anon_key = "sb_publishable_BXVw18vT1XYHWu6NOT536A_9OKUwP4_";
const supabaseUrl = "https://pizuqoxtldfccxmjmbzm.supabase.co";

const supabase = createClient(supabaseUrl, anon_key);

export default function MediaUpload(file) {

    return new Promise((resolve, reject) => {

        if(file==null){
            reject("No file provided");
        }

        const timestamp = new Date().getTime();
        const fileName = timestamp + file.name;

        supabase.storage.from("images").upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
        }).then(() => {
            const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
            resolve(publicUrl);
        }).catch(() => {
            reject("Error occurred while uploading file");
        })
        
    });


}  