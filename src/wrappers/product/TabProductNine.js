import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitleThree from "../../components/section-title/SectionTitleThree";
import ProductGridTwo from "./ProductGridTwo";
import WebService from '../../util/webService';
import constant from '../../util/constant';

const TabProductNine = ({
  spaceTopClass,
  spaceBottomClass,
  category,
  containerClass,
  extraClass
}) => {
  // const [featuredData, setFeaturedData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    getProductList();

  }, []);
  const getProductList = async () => {
    let action = constant.ACTION.PRODUCT_GROUP + 'FEATURED_ITEM';
    try {
      let response = await WebService.get(action);
      // console.log(response);
      if (response) {
        let category = [{ 'id': '', 'name': 'All', 'code': 'all', data: response.products }];
        response.products.map(item => {
          item.categories.map(a => {
            // console.log(a)
            let index = category.findIndex(value => value.id == a.id);
            // console.log(index);
            if (index == -1) {
              category.push({ 'id': a.description.id, 'name': a.description.name, 'code': a.code, data: [item] })
            } else {
              category[index].data.push(item)
            }
          })
        });
        // setFeaturedData(response.products)
        setCategoryData(category)
      }
    } catch (error) {
    }
  }
  return (
    <div
      className={`product-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
        } ${extraClass ? extraClass : ""}`}
    >
      <div className={`${containerClass ? containerClass : "container"}`}>
        <SectionTitleThree titleText="Featured Products" positionClass="text-center" />
        <Tab.Container defaultActiveKey="all">
          <Nav variant="pills" className="product-tab-list pt-30 pb-55 text-center">
            {
              categoryData.map((value, i) => {
                return (
                  <Nav.Item key={i} >
                    <Nav.Link eventKey={value.code}>
                      <h4>{value.name}</h4>
                    </Nav.Link>
                  </Nav.Item>)
              })
            }
          </Nav>
          <Tab.Content>
            {
              categoryData.map((value, i) => {
                return (
                  <Tab.Pane key={i} eventKey={value.code}>
                    <div className="row">
                      <ProductGridTwo
                        products={value.data}
                        type="men"
                        limit={8}
                        spaceBottomClass="mb-25"
                      />
                    </div>
                  </Tab.Pane>
                )
              })
            }
            {/* <Tab.Pane eventKey="women">
              <div className="row">
                <ProductGridTwo
                  products={featuredData}
                  category="women"
                  limit={8}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="saleItems">
              <div className="row">
                <ProductGridTwo
                  products={featuredData}
                  category={category}
                  type="saleItems"
                  limit={8}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane> */}
          </Tab.Content>
        </Tab.Container>
        {/* <div className="view-more round-btn text-center mt-20 toggle-btn6 col-12">
          <Link className="loadMore6">
            Discover More
          </Link>
        </div> */}
      </div>
    </div>
  );
};

TabProductNine.propTypes = {
  category: PropTypes.string,
  containerClass: PropTypes.string,
  extraClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default TabProductNine;
