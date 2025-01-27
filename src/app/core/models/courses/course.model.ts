import { DurationUnit } from "./duration_unit.enum";

export interface Course {
    id: number;
    name: string;
    description: string;
    duration: number;
    durationUnit: DurationUnit;
    contentMarkdown: string;
    imageUrl: string;
    level: string;
    prerequisites: string[];
    tags: string[];
}
