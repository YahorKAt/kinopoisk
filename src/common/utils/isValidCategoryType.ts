import { Category, type CategoryType } from "@/common/enums"

export const isValidCategoryType = (value: string | undefined): value is CategoryType => {
    return typeof value === "string" && Object.values(Category).includes(value as CategoryType)
}
