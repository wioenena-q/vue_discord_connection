export type ImageFormat = "jpg" | "jpeg" | "png" | "webp" | "gif"
export type ImageSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;
export const CDN_URL = "https://cdn.discordapp.com"
export const avatarURL = (id: string, hash: string, format: ImageFormat = "png", size: ImageSize = 1024) => {
    return `${CDN_URL}/avatars/${id}/${hash}.${format}?size=${size}`;
}