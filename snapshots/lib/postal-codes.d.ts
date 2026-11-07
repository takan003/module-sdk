import "server-only";
import { type PostalCodeOption } from "@/types/postal-codes";
export declare function getPostalCodeOptions(): Promise<PostalCodeOption[]>;
export declare function savePostalCodeOptions(options: PostalCodeOption[]): Promise<void>;
