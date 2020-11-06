import styled from 'styled-components';
import { gray } from '../../../constants/Colors';

const SalesProductListContainer = styled.div`
margin-top: 5px;
box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
display: block;
position: relative;
border-radius: 10px;
background: #fff;
color: rgba(0,0,0,.87);
margin-bottom: 10%;
.sales-product-list-header {
    padding: 16px;
    display: flex;
    justify-content: flex-end;
    &.justify-to-start {
        justify-content: flex-start;
    }
    border-bottom: 2px solid ${gray};
    &__search {
        margin-bottom: 0px;
    }
    .add-item {
        max-height: 20px;
    }
}
.sales-product-list {
    overflow-y: auto;
    max-height: 450px;
    .sales-product-item {
        padding: 16px;
        border-bottom: 1px solid ${gray};
        .sales-product-item-line1 {
            display: flex;
            justify-content: space-between;
            &__name {
                font-weight: 500;
                font-size: 1.5rem;
            }
            &__edit-button {
                max-height: 25px;
                cursor: pointer;
            }
        }
        .sales-product-item-line2 {
            display: flex;
            justify-content: flex-start;
            &__qty {
                line-height: 0px;
            }
            &__text {
                min-width: 150px;
                color: black;
                line-height: 3rem;
                font-size: 18px;
                .sales-product-currency {
                    max-height: 18px;
                    margin-right: 3px;
                }
                .sales-product-packing {
                    max-height: 46px;
                    margin-right: 3px;
                }
                .id {
                    font-weight: 400;
                    margin-left: 10px;
                }
            }
        }
    }
}
.sales-product-list-empty {
    min-height: 10%;
    padding: 100px 0px;
    display: flex;
    justify-content: center;
}
`;

export default SalesProductListContainer;
