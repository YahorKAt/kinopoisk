import { Slider } from "@base-ui/react/slider"
import s from "./RangeSlider.module.css"

type Props = {
    ratingMin: number
    ratingMax: number
    onFilterChange: (newValues: { ratingMin: number; ratingMax: number }) => void
}

export const RangeSlider = ({ ratingMin, ratingMax, onFilterChange }: Props) => {
    return (
        <Slider.Root
            value={[ratingMin, ratingMax]}
            min={0}
            max={10}
            step={0.1}
            thumbCollisionBehavior={"none"}
            onValueChange={(value) => {
                onFilterChange({
                    ratingMin: value[0],
                    ratingMax: value[1],
                })
            }}
        >
            <Slider.Control className={s.control}>
                <Slider.Track className={s.track}>
                    <Slider.Indicator className={s.indicator} />
                    <Slider.Thumb index={0}  aria-label="Minimum value" className={s.thumb} />
                    <Slider.Thumb index={1} aria-label="Maximum value" className={s.thumb} />
                </Slider.Track>
            </Slider.Control>
        </Slider.Root>
    )
}
