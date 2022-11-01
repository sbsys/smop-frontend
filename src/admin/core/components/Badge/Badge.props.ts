import { ChildrenProps } from 'shared/props';

export interface BadgeProps extends ChildrenProps {
    className?: string;
    onRemove?: () => void;
}
