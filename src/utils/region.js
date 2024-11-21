import { create } from "zustand";

const userRegion = create((set) => {
    return{
        region: "",
        setRegionIndia: () => set((state) => ({ region: "India" })),
        setRegionInter: () => set((state) => ({ region: "International" })),
    };
});

export default userRegion;