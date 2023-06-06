import base from "axios";

export const axios = base.create({
    withCredentials: true
})