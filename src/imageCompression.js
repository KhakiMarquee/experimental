export function imageCompress() {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        // Create a canvas element
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas dimensions to match the image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0);

        // Compress the image
        canvas.toBlob(blob => {
            // Create a new image element
            const newImg = document.createElement('img');
            newImg.src = URL.createObjectURL(blob);

            // Replace the original image with the compressed one
            img.parentNode.replaceChild(newImg, img);
        }, 'image/jpeg', 0.7); // Adjust quality as needed
    });
}
