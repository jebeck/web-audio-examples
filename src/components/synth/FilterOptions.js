import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import { FILTER_TYPES } from 'web-audio-hooks';

import { actions } from '../../synthReducer';

export default function FilterOptions({
  dispatch,
  filterNode,
  filterState,
  voiceIdx,
}) {
  return (
    <>
      <TextField
        helperText="add a filter"
        label="filter"
        onChange={(e) => {
          if (e?.target?.value) {
            dispatch(actions.addFilter(voiceIdx, e?.target?.value));
          } else {
            dispatch(actions.removeFilter(voiceIdx));
          }
        }}
        select
        style={{ alignSelf: 'flex-end', width: '25ch' }}
        value={filterState?.type || ''}
        variant="outlined"
      >
        <MenuItem key="none" value={null}>
          (none)
        </MenuItem>
        {FILTER_TYPES.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>
      {filterState?.Q != null ? (
        <TextField
          label="Q"
          onChange={(e) => {
            dispatch(
              actions.editFilter(voiceIdx, 'Q', parseInt(e?.target?.value, 10))
            );
          }}
          size="small"
          style={{
            alignSelf: 'flex-end',
            marginTop: '1rem',
            width: '20ch',
          }}
          type="number"
          value={filterState?.Q || ''}
          variant="outlined"
        />
      ) : null}
      <TextField
        helperText="100 = 1 semitone"
        inputProps={{ step: 100 }}
        label="detune"
        onChange={(e) => {
          dispatch(
            actions.editFilter(
              voiceIdx,
              'detune',
              parseInt(e?.target?.value, 10)
            )
          );
        }}
        size="small"
        style={{
          alignSelf: 'flex-end',
          marginTop: '1rem',
          width: '20ch',
        }}
        type="number"
        value={filterState?.detune || ''}
        variant="outlined"
      />
      {filterState?.frequency != null ? (
        <TextField
          inputProps={{ step: 25 }}
          label="frequency"
          onChange={(e) => {
            dispatch(
              actions.editFilter(
                voiceIdx,
                'frequency',
                parseInt(e?.target?.value, 10)
              )
            );
          }}
          size="small"
          style={{
            alignSelf: 'flex-end',
            marginTop: '1rem',
            width: '20ch',
          }}
          type="number"
          value={filterState?.frequency || ''}
          variant="outlined"
        />
      ) : null}
      {filterState?.gain != null ? (
        <TextField
          label="gain"
          onChange={(e) => {
            dispatch(
              actions.editFilter(
                voiceIdx,
                'gain',
                parseInt(e?.target?.value, 10)
              )
            );
          }}
          size="small"
          style={{
            alignSelf: 'flex-end',
            marginTop: '1rem',
            width: '20ch',
          }}
          type="number"
          value={filterState?.gain || ''}
          variant="outlined"
        />
      ) : null}
    </>
  );
}
