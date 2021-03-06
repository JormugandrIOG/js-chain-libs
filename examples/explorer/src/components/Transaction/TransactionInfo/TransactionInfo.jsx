import React from 'react';

import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';

import Table from 'react-bootstrap/Table';

import { BlockLink, CopiableItem, AssuranceLevel, BlockDateTime, Amount } from '../../Commons';
import { feesAmount } from '../../../helpers/transactionHelper';

const TransactionInfo = ({ transaction, status }) => {
  return (
    <div className="entityInfoTable">
      <h2>Transaction</h2>
      <div className="keyValueTable">
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>Hash:</td>
              <td>
                <CopiableItem text={transaction.id} />
              </td>
            </tr>
            <tr>
              <td>Block:</td>
              <td>
                <BlockLink id={transaction.block.id} />
              </td>
            </tr>
            <tr>
              <td>Date:</td>
              <td>
                <BlockDateTime blockDate={transaction.block.date} />
              </td>
            </tr>
            <tr>
              <td>Assurance level:</td>
              <td>
                <AssuranceLevel {...{ transaction, status }} />
              </td>
            </tr>
            <tr>
              <td>Total fees:</td>
              <td>
                <Amount decimalAmount={feesAmount(transaction)} />
              </td>
            </tr>
            <tr>
              <td>Inputs count:</td>
              <td>{transaction.inputs.length}</td>
            </tr>
            <tr>
              <td>Outputs count:</td>
              <td>{transaction.outputs.length}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default createFragmentContainer(TransactionInfo, {
  transaction: graphql`
    fragment TransactionInfo_transaction on Transaction {
      id
      block {
        id
        chainLength
        date {
          ...BlockDateTime_blockDate
        }
      }
      inputs {
        amount
      }
      outputs {
        amount
      }
    }
  `,
  status: graphql`
    fragment TransactionInfo_status on Status {
      latestBlock {
        chainLength
      }
    }
  `
});
