import React from "react";
import parse, { domToReact } from "html-react-parser"; // https://github.com/remarkablemark/html-react-parser
import PropTypes from "prop-types";

// Material UI imports
import { Paper, Typography, makeStyles, Grid, IconButton } from "@material-ui/core";
import { CloseRounded, ArrowBackIos } from "@material-ui/icons";

// i18n imports
import { injectIntl, intlShape, FormattedMessage } from "react-intl";

// Custom components imports
import JobSubtitle from "../jobCard/src/JobSubtitle";
import KeyFactsBox from "./src/KeyFactsBox";
import SectionHeader from "./src/SectionHeader";

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: "10px",
    height: "100%",
    padding: theme.spacing(2, 2)
  },
  link: {
    color: "#f57c00",
    fontWeight: 500
  },
  closeModal: {
    position: "absolute",
    cursor: "pointer",
    right: "1em"
  },
  closePage: {
    position: "absolute",
    cursor: "pointer",
    left: "2em"
  }
}));

const JobPageContainer = props => {
  const {
    jobInfo,
    fullJobInfo,
    intl,
    handleCloseModal,
    handleClosePage,
    isMobile,
    isMediumSize
  } = props;
  const { formatMessage } = intl;
  const classes = useStyles();

  const options = {
    replace: ({ attribs, children }) => {
      if (!attribs) return;

      if (
        (attribs.href && attribs.href.includes("http")) ||
        (attribs.href && attribs.href.includes("mailto"))
      ) {
        return (
          <a
            href={attribs.href}
            style={{ color: "#f57c00", fontWeight: 500 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {domToReact(children)}
          </a>
        );
      }
    }
  };

  if (fullJobInfo) {
    const job = fullJobInfo[0];
    return (
      <Paper className={classes.root} elevation={2}>
        <Grid container>
          {!isMediumSize && (
            <IconButton
              aria-label="close modal job page"
              className={classes.closeModal}
              onClick={() => handleCloseModal()}
            >
              <CloseRounded />
            </IconButton>
          )}
          {isMediumSize && (
            <Grid item xs={1}>
              <IconButton
                aria-label="close full job page"
                className={classes.closePage}
                onClick={() => handleClosePage()}
              >
                <ArrowBackIos />
              </IconButton>
            </Grid>
          )}
          {job.title && (
            <Grid item xs>
              <Typography
                variant="h5"
                component="h4"
                style={
                  !isMediumSize ? { fontWeight: 500, paddingTop: "2.5em" } : { fontWeight: 500 }
                }
                align="center"
              >
                {job.title}
              </Typography>
            </Grid>
          )}
        </Grid>
        {jobInfo && (
          <Grid container>
            {isMediumSize && <Grid item xs={1} />}
            <Grid item xs>
              <JobSubtitle jobInfo={jobInfo} alignCenter style={{ fontSize: "1em" }} />
            </Grid>
          </Grid>
        )}

        <>
          <SectionHeader primaryText={formatMessage({ id: "component.job.keyFacts" })} />
          <div style={{ paddingTop: "1em" }}>
            <KeyFactsBox job={job} />
          </div>
        </>

        {/* JOB DESCRIPTION SECTION */}
        {job.body_html && (
          <>
            <SectionHeader primaryText={formatMessage({ id: "component.job.description" })} />{" "}
            {parse(`${job.body_html}`, options)}
          </>
        )}

        {/* QUALIFICATIONS SECTION */}
        {job.qualifications_html && (
          <>
            <SectionHeader primaryText={formatMessage({ id: "component.job.qualifications" })} />{" "}
            {parse(`${job.qualifications_html}`, options)}
          </>
        )}

        {/* CONTRACT/SALARY SECTION */}
        {job.salary_html && (
          <>
            <SectionHeader primaryText={formatMessage({ id: "component.job.salary" })} />{" "}
            {parse(`${job.salary_html}`, options)}
          </>
        )}

        {/* HOW TO APPLY SECTION */}
        {job.how_to_apply_html && (
          <>
            <SectionHeader primaryText={formatMessage({ id: "component.job.howToApply" })} />{" "}
            {parse(`${job.how_to_apply_html}`, options)}
          </>
        )}

        {/* APPLY ONLINE SECTION */}
        {job.links && (
          <>
            <SectionHeader primaryText={formatMessage({ id: "component.job.applyOnline" })} />{" "}
            <div style={{ paddingTop: "1em" }}>
              <a
                href={job.links.applyOnline}
                className={classes.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {job.links.applyOnline}
              </a>
            </div>
          </>
        )}

        {/* LINKS SECTION */}
        {job.files && (
          <>
            <SectionHeader primaryText={formatMessage({ id: "component.job.links" })} />{" "}
            <div>
              <ul>
                {job.files.links.map(file => {
                  return (
                    <li key={file.url}>
                      <a
                        href={file.url}
                        className={classes.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {file.name || <FormattedMessage id="component.job.link" />}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}
      </Paper>
    );
  } else return null;
};

JobPageContainer.propTypes = {
  intl: intlShape.isRequired,
  jobInfo: PropTypes.object.isRequired,
  fullJobInfo: PropTypes.array.isRequired,
  handleCloseModal: PropTypes.func,
  handleClosePage: PropTypes.func,
  isMobile: PropTypes.bool,
  isMediumSize: PropTypes.bool
};

JobPageContainer.defaultProps = {
  handleCloseModal: () => {},
  handleClosePage: () => {},
  isMobile: false,
  isMediumSize: false
};

export default injectIntl(JobPageContainer);
