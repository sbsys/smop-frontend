/* react */
import { FC, memo, useMemo } from 'react';
/* props */
import { LanguageChangerProps } from './LanguageChanger.props';
/* components */
import { Button, ButtonProps } from 'shared/components';
/* hooks */
import { Lang, LangProps, useAdminLang } from 'admin/core';
/* utils */
import { classNames } from 'shared/utils';
/* styles */
import styles from './LanguageChanger.module.scss';

const LanguageChanger: FC<LanguageChangerProps> = ({ className, ...rest }) => {
    const { lang, availableLangs, changeLang } = useAdminLang();

    const langs = useMemo(
        () => Object.keys(availableLangs).map(item => availableLangs[item as Lang]),
        [availableLangs]
    );

    const langProps = (langProps: LangProps): ButtonProps => ({
        className: classNames(styles.Lang),
        type: 'button',
        title: langProps.language,
        children: langProps.lang,
        onClick: () => changeLang(langProps.lang),
        disabled: langProps.lang === lang,
    });

    return (
        <fieldset className={classNames(styles.LanguageChanger, className)} {...rest}>
            <ul>
                {langs.map((item, index) => (
                    <li key={index}>
                        <Button {...langProps(item)} />

                        {langs.length - 1 > index && <span />}
                    </li>
                ))}
            </ul>
        </fieldset>
    );
};

export default memo(LanguageChanger);
