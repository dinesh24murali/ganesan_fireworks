import styled from 'styled-components';

const SalesListContainer = styled.div`
.sales-table {
    margin-top: 50px;
    .cracker_list_arrow {
        max-height: 20px;
        cursor: pointer;
    }
    .delete_sales {
        max-height: 28px;
        cursor: pointer;
    }
    .sales-data-table {
        padding: 0px 0px 0px 10px;
        overflow-y: auto;
        height: 30vh;
    }
}
.pagination-container {
    display: flex;
    justify-content: center;
}
`;

export default SalesListContainer;
