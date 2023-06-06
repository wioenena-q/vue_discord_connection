export interface IUser {
    id: string;
    username: string;
    avatar: string | null;
    banner: string | null;
    guilds: IGuild[];
}

export interface IGuild {
    id: string;
    name: string;
    icon: string | null;
}

export interface IConfig {
    API_URL: string;
}