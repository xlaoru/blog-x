export function convertImageToBase64(event: any): Promise<string> {
    return new Promise((resolve, reject) => {
        const image = event.target.elements.avatar.files[0];
        if (!image) {
            resolve(""); 
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(image);

        reader.onload = (e: any) => {
            const img = new Image();
            img.src = e.target.result as string; 

            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                const MAX_WIDTH = 800; 
                const MAX_HEIGHT = 800; 
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= (MAX_WIDTH / width);
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= (MAX_HEIGHT / height);
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                ctx!.drawImage(img, 0, 0, width, height);

                const base64Image = canvas.toDataURL(image.type);
                resolve(base64Image);
            };

            img.onerror = (error) => {
                console.log("Error loading image: ", error);
                reject(error); 
            };
        };

        reader.onerror = (error) => {
            console.log("Error: ", error);
            reject(error); 
        };
    });
}
