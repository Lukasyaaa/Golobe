import { type FC, useState, useRef, useEffect, createElement } from "react";
import { type IconOptionValue, type FullOptionValue, type SelectLink, type useStateReturned, ICON_POSITION, SELECT_DESCRIPTION_TYPE, STROKE_LINEJOIN, FILL_RULE, STROKE_LINECAP } from "../../../../types";
import { SelectText, SelectIconCategory as SelectIcon, SelectFullCategory as SelectFull, type SelectProps } from "../Select/Select";
import { useAppDispatch } from "../../../../store";
import { flightsSlice } from "../../../../store/flights";
export const { swapSortLinks } = flightsSlice.actions;

export type ChooseType = "string" | "iconOption" | "fullOption";

export type ChooseTypeMap = {
    string: string;
    iconOption: IconOptionValue;
    fullOption: FullOptionValue;
};

// Общие пропсы
export interface ChooseBaseProps<T extends ChooseType> {
    type: T;
    links: ChooseTypeMap[T][];
    maxShow: number;
    opener: string;
    activeOption: useStateReturned<number>;
    ChildrenComponent: FC<SelectLink<ChooseTypeMap[T]>>;
}

export function Choose<T extends ChooseType>({
    type,
    links,
    maxShow,
    opener,
    activeOption,
    ChildrenComponent
}: ChooseBaseProps<T>) {

    const dispatch = useAppDispatch();
    const isOpened = useState(false);

    const [isHoveredOnUnactive, setIsHoveredOnUnactive] = useState(false);
    const [activeOptionValue, setActiveOption] = activeOption;

    const sort = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const sortElement = sort.current;
        if (sortElement) {
            if (isHoveredOnUnactive) {
                sortElement.classList.add("_hide-active");
            } else {
                sortElement.classList.remove("_hide-active");
            }
        }
    }, [isHoveredOnUnactive]);

    const makeIsHoveredOnUnActive = () => setIsHoveredOnUnactive(true);
    const unMakeIsHoveredOnUnActive = () => setIsHoveredOnUnactive(false);
    const makeActive = (id: number) => setActiveOption(id);

    let SelectComponent = ((): FC<SelectProps<ChooseTypeMap[T]>> => {
        switch (type) {
            case "string":
                return SelectText as unknown as FC<SelectProps<ChooseTypeMap[T]>>;
            case "iconOption":
                return SelectIcon as unknown as FC<SelectProps<ChooseTypeMap[T]>>;
            case "fullOption":
                return SelectFull as unknown as FC<SelectProps<ChooseTypeMap[T]>>;
        }
    })();

    return (
        <article className="sort" ref={sort}>
            {links.slice(0, maxShow).map((link, i) => {
                if (activeOptionValue === i) {
                    return (
                        <div key={i} className="sort__button button-sort">
                            {createElement(ChildrenComponent, { cls: ["button-sort"], about: link })}
                        </div>
                    );
                } else {
                    return (
                        <button
                            key={i}
                            className="sort__button button-sort"
                            type="button"
                            onClick={() => { makeActive(i); unMakeIsHoveredOnUnActive(); }}
                            onMouseEnter={makeIsHoveredOnUnActive}
                            onFocus={makeIsHoveredOnUnActive}
                            onBlur={unMakeIsHoveredOnUnActive}
                            onMouseLeave={(e) => {
                                if (e.currentTarget !== document.activeElement) unMakeIsHoveredOnUnActive();
                            }}
                        >
                            {createElement(ChildrenComponent, { cls: ["button-sort"], about: link })}
                        </button>
                    );
                }
            })}

            {maxShow < links.length && (
                <div className="sort__more more-sort">
                    <SelectComponent
                        parentCls={["more-sort"]}
                        description={{ value: opener, type: SELECT_DESCRIPTION_TYPE.onlyText }}
                        links={links.slice(maxShow)}
                        isOpened={isOpened}
                        ChildrenComponent={ChildrenComponent}
                        onLinkClickHandler={(id) =>
                            dispatch(
                                swapSortLinks({
                                    firstIndex: activeOptionValue,
                                    secondIndex: id + maxShow
                                })
                            )
                        }
                        onMouseEnterHandler={undefined}
                        onFocusHandler={undefined}
                        onMouseLeaveHandler={undefined}
                        onBlurHandler={undefined}
                        iconValue={{
                            viewbox: { minX: 0, minY: 0, width: 18, height: 10.5 },
                            width: 18,
                            height: 10.5,
                            pathes: [{fill: "unset", fillRule: FILL_RULE.nonzero, stroke: "#000000", strokeLinecap: STROKE_LINECAP.round, strokeLinejoin: STROKE_LINEJOIN.miter, strokeWidth: "1.5", d: "m 0.75,0.75 h 16.5 m -16.5,4.5 h 16.5 m -16.5,4.5 h 16.5"}]
                        }}
                        iconPosition={ICON_POSITION.left}
                    />
                </div>
            )}
        </article>
    );
}
    
export const ChooseText = (props: Omit<ChooseBaseProps<"string">, "type">) => (
    <Choose {...props} type="string" />
);

export const ChooseIcon = (props: Omit<ChooseBaseProps<"iconOption">, "type">) => (
    <Choose {...props} type="iconOption" />
);

export const ChooseFull = (props: Omit<ChooseBaseProps<"fullOption">, "type">) => (
    <Choose {...props} type="fullOption" />
);