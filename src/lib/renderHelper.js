export const applyPropsToComponent = (appliedProps) => (fn) => (actProps) => fn({ ...appliedProps, ...actProps })
