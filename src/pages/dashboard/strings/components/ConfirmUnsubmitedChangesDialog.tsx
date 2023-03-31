import { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import ConfirmationDialog from 'components/ConfirmationDialog';
import { UnsubmitedChanges } from '../strings.hooks';

type Props = {
  unsubmitedChanges: UnsubmitedChanges;
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmUnsubmitedChangesDialog(props: Props) {
  const { unsubmitedChanges, open, loading, onClose, onConfirm } = props;

  const { deleted, updated, created } = useMemo(() => {
    const deleted = [];
    const updated = [];
    const created = [];
    Object.values(unsubmitedChanges)
      .filter(Boolean)
      .forEach((item) => {
        if (item.type === 'delete') {
          deleted.push(item.item);
        } else if (item.type === 'update') {
          updated.push(item.item);
        } else if (item.type === 'create') {
          created.push(item.item);
        }
      });
    return { deleted, updated, created };
  }, [unsubmitedChanges]);

  return (
    <ConfirmationDialog
      open={open}
      title={'Are you sure you want to submit this changes?'}
      loading={loading}
      onSubmit={onConfirm}
      onClose={() => onClose()}
    >
      <Box sx={{ px: 3 }}>
        <ul>
          {[
            {
              type: 'create',
              count: created.length,
            },
            {
              type: 'update',
              count: updated.length,
            },
            {
              type: 'delete',
              count: deleted.length,
            },
          ].map(({ type, count }) => (
            <Box key={`${type}`} component={'li'} sx={{ textOverflow: 'ellipsis' }}>
              <Typography noWrap>
                <b className={`text-type-${type}`}>{count} rows</b> {type}
              </Typography>
            </Box>
          ))}
        </ul>
      </Box>
    </ConfirmationDialog>
  );
}
