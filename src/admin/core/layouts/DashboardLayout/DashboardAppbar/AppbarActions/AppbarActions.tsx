/* react */
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
/* store */
import { selectAuthStore } from 'admin/auth';
/* hooks */
import { useActive, useClickOutside, useKeyDownEvent } from 'shared/hooks';
import { Lang, LangProps, useAdminLang } from 'admin/core/hooks';
/* layouts */
import { AccordionLayout, DropLayout, PanelLayout } from 'shared/layouts';
/* components */
import { Button, ButtonProps, Legend } from 'shared/components';
/* services */
import { useAdminSelector } from 'admin/core/services';
/* utils */
import { classNames } from 'shared/utils';
/* assets */
import { MdArrowDropDown, MdArrowDropUp, MdLanguage, MdLogout } from 'react-icons/md';
/* atyles */
import styles from './AppbarActions.module.scss';

const AppbarActions = () => {
    const [isDrop, , hideDrop, toggleDrop] = useActive();

    useKeyDownEvent(event => event.key === 'Escape' && hideDrop());

    const [ref] = useClickOutside(hideDrop);

    const [isAccordion, , , toggleAccordion] = useActive();

    const { availableLangs, lang, changeLang } = useAdminLang();

    const langs = useMemo(
        () => Object.keys(availableLangs).map(item => availableLangs[item as Lang]),
        [availableLangs]
    );

    const langProps = (langProps: LangProps): ButtonProps => ({
        className: classNames(styles.Action, styles.Lang),
        type: 'button',
        title: langProps.language,
        children: (
            <>
                <Legend>{langProps.lang}</Legend>

                <Legend hasDots>{langProps.language}</Legend>
            </>
        ),
        onClick: () => changeLang(langProps.lang),
        disabled: langProps.lang === lang,
    });

    const { user } = useAdminSelector(selectAuthStore);

    const { t } = useTranslation();

    return (
        <DropLayout
            isDrop={isDrop}
            dropRow="end"
            anchorRow="end"
            ref={ref}
            drop={
                <PanelLayout className={styles.Actions} orientation="col">
                    <AccordionLayout
                        isAccordion={isAccordion}
                        accordion={
                            <PanelLayout className={styles.Langs} orientation="col">
                                {
                                    <ul>
                                        {langs.map((item, index) => (
                                            <li key={index}>
                                                <Button {...langProps(item)} />
                                            </li>
                                        ))}
                                    </ul>
                                }
                            </PanelLayout>
                        }>
                        <Button className={styles.Action} onClick={toggleAccordion} title={t('dashboard.actions.lang')}>
                            <i>
                                <MdLanguage />
                            </i>

                            <Legend hasDots>{t('dashboard.actions.lang')}</Legend>
                        </Button>
                    </AccordionLayout>
                    <Button className={styles.Action} title={t('dashboard.actions.logout')}>
                        <i>
                            <MdLogout />
                        </i>

                        <Legend hasDots>{t('dashboard.actions.logout')}</Legend>
                    </Button>
                </PanelLayout>
            }>
            <Button className={styles.MainAction} onClick={toggleDrop} title={user.name}>
                <Legend hasDots>{user.name}</Legend>

                <i>{isDrop ? <MdArrowDropUp /> : <MdArrowDropDown />}</i>
            </Button>
        </DropLayout>
    );
};

export default memo(AppbarActions);
