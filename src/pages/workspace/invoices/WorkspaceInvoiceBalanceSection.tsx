import React from 'react';
import {useOnyx} from 'react-native-onyx';
import Balance from '@components/Balance';
import * as Expensicons from '@components/Icon/Expensicons';
import Section from '@components/Section';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import ONYXKEYS from '@src/ONYXKEYS';

type WorkspaceInvoiceBalanceSectionProps = {
    /** The policy ID currently being configured */
    policyID: string;
};

function WorkspaceInvoiceBalanceSection({policyID}: WorkspaceInvoiceBalanceSectionProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const [policy] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY}${policyID}`);

    return (
        <Section
            title={translate('workspace.invoices.invoiceBalance')}
            subtitle={translate('workspace.invoices.invoiceBalanceSubtitle')}
            isCentralPane
            titleStyles={styles.textStrong}
            childrenStyles={styles.pt5}
            subtitleMuted
            menuItems={
                // @ts-expect-error TODO: Add invoice to types/onyx/Policy.ts
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                policy?.invoice?.bankAccount
                    ? [
                          {
                              title: translate('common.transferBalance'),
                              onPress: () => console.debug('Transfer balance'),
                              icon: Expensicons.Transfer,
                              shouldShowRightIcon: true,
                              iconRight: Expensicons.ArrowRight,
                              wrapperStyle: [styles.workspaceTransferBalance],
                          },
                      ]
                    : []
            }
        >
            <Balance
                style={styles.walletBalance}
                // @ts-expect-error TODO: Add invoice to types/onyx/Policy.ts
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
                balance={policy?.invoice?.bankAccount?.stripeConnectAccountBalance ?? 0}
            />
        </Section>
    );
}

export default WorkspaceInvoiceBalanceSection;
