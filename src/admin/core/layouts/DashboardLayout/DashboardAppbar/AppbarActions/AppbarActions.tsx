/* react */
import { memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
/* store */
import { authStoreSignOut, selectAuthStore, SignInDTO } from 'admin/auth';
/* hooks */
import { useActive, useClickOutside, useKeyDownEvent, useLocalStorage } from 'shared/hooks';
import { Lang, LangProps, useAdminLang, useAdminNotify } from 'admin/core/hooks';
/* layouts */
import { AccordionLayout, DropLayout, PanelLayout } from 'shared/layouts';
/* components */
import { Button, ButtonProps, Legend } from 'shared/components';
/* services */
import { useAdminDispatch, useAdminSelector } from 'admin/core/services';
/* utils */
import { classNames } from 'shared/utils';
/* assets */
import { MdArrowDropDown, MdArrowDropUp, MdCheck, MdLanguage, MdLogout } from 'react-icons/md';
import { RiRotateLockFill } from 'react-icons/ri';
/* atyles */
import styles from './AppbarActions.module.scss';

const AppbarActions = () => {
    /* states */
    const [isDrop, , hideDrop, toggleDrop] = useActive();

    useKeyDownEvent(event => event.key === 'Escape' && hideDrop());

    const [ref] = useClickOutside(hideDrop);

    const [isAccordion, , , toggleAccordion] = useActive();

    const { availableLangs, lang, changeLang } = useAdminLang();

    const langs = useMemo(
        () => Object.keys(availableLangs).map(item => availableLangs[item as Lang]),
        [availableLangs]
    );

    const { user } = useAdminSelector(selectAuthStore);

    const dispatch = useAdminDispatch();

    const [, , clearAuthLocalStorage] = useLocalStorage<SignInDTO>('auth', {} as SignInDTO);

    const { notify } = useAdminNotify();

    const navigate = useNavigate();

    const { translate } = useAdminLang();

    /* functions */

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

    const handlePasswordRecovery = () => navigate('/admin/security/password-recovery');

    const handleSignOut = () => {
        clearAuthLocalStorage();

        dispatch(authStoreSignOut());

        return notify('warning', {
            title: 'Success',
            icon: <MdCheck />,
            text: 'Session terminated by the current user',
            timestamp: new Date(),
        });
    };

    return (
        <DropLayout
            isDrop={isDrop}
            dropRow="end"
            anchorRow="end"
            ref={ref}
            className={styles.Drop}
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
                        <Button
                            className={styles.Action}
                            onClick={toggleAccordion}
                            title={translate('actions.changelanguage')}>
                            <i>
                                <MdLanguage />
                            </i>

                            <Legend hasDots>{translate('actions.changelanguage')}</Legend>
                        </Button>
                    </AccordionLayout>

                    <Button
                        className={styles.Action}
                        title={translate('actions.pwrecovery')}
                        onClick={handlePasswordRecovery}>
                        <i>
                            <RiRotateLockFill />
                        </i>

                        <Legend hasDots>{translate('actions.pwrecovery')}</Legend>
                    </Button>

                    <Button className={styles.Action} title={translate('actions.logout')} onClick={handleSignOut}>
                        <i>
                            <MdLogout />
                        </i>

                        <Legend hasDots>{translate('actions.logout')}</Legend>
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
